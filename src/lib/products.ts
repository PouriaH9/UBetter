import type { Locale } from "@/i18n/config"
import { tx, type T } from "@/data/product-categories"
import { getProductTranslation } from "@/data/product-translations"
import { medusa, MEDUSA_ENABLED } from "@/lib/medusa"

export type MergedProduct = {
  productNum: number
  medusaProductId?: string
  variantId?: string
  handle?: string
  name: T
  category: T
  description: T
  features: T[]
  applications: T[]
  priceIrr?: number
  priceLabel?: string
  inStock: boolean
  imageUrl?: string
  purchaseMode: "online" | "quote"
}

const productCache = new Map<number, MergedProduct>()
let regionIdCache: string | null = null

export function formatPrice(amountIrr: number, locale: Locale): string {
  const toman = Math.round(amountIrr / 10)
  if (locale === "fa") {
    return `${toman.toLocaleString("fa-IR")} تومان`
  }
  return `${toman.toLocaleString("en-US")} Toman`
}

function mergeWithTranslation(
  productNum: number,
  medusaData?: {
    id: string
    handle?: string
    thumbnail?: string | null
    variants?: Array<{
      id: string
      calculated_price?: { calculated_amount?: number | null }
      inventory_quantity?: number
    }>
    metadata?: Record<string, unknown>
  }
): MergedProduct {
  const translation = getProductTranslation(productNum)
  if (!translation) {
    throw new Error(`Missing translation for product ${productNum}`)
  }

  const variant = medusaData?.variants?.[0]
  const priceIrr = variant?.calculated_price?.calculated_amount ?? undefined
  const inStock =
    variant?.inventory_quantity === undefined
      ? true
      : variant.inventory_quantity > 0

  return {
    productNum,
    medusaProductId: medusaData?.id,
    variantId: variant?.id,
    handle: medusaData?.handle,
    name: translation.name,
    category: translation.category,
    description: translation.description,
    features: translation.features,
    applications: translation.applications,
    priceIrr: priceIrr ?? undefined,
    priceLabel: priceIrr !== undefined ? undefined : undefined,
    inStock,
    imageUrl: medusaData?.thumbnail ?? undefined,
    purchaseMode:
      (medusaData?.metadata?.purchase_mode as "online" | "quote") || "online",
  }
}

export async function getRegionId(): Promise<string | null> {
  if (regionIdCache) return regionIdCache
  if (!MEDUSA_ENABLED) return null

  try {
    const { regions } = await medusa.store.region.list()
    const iran = regions?.find(
      (r: { id: string; name?: string; countries?: Array<{ iso_2?: string }> }) =>
        r.countries?.some((c) => c.iso_2 === "ir") || r.name === "Iran"
    )
    regionIdCache = iran?.id ?? regions?.[0]?.id ?? null
    return regionIdCache
  } catch {
    return null
  }
}

export async function fetchMedusaProductByNum(
  productNum: number
): Promise<MergedProduct> {
  const cached = productCache.get(productNum)
  if (cached?.variantId) return cached

  const translation = getProductTranslation(productNum)
  if (!translation) {
    throw new Error(`Product ${productNum} not found`)
  }

  if (!MEDUSA_ENABLED) {
    const fallback = mergeWithTranslation(productNum)
    productCache.set(productNum, fallback)
    return fallback
  }

  try {
    const regionId = await getRegionId()
    const { products } = await medusa.store.product.list({
      limit: 100,
      fields: "+variants.calculated_price,+variants.inventory_quantity",
      region_id: regionId ?? undefined,
    })

    const match = products?.find(
      (p: { metadata?: Record<string, unknown> }) =>
        Number(p.metadata?.legacy_product_num) === productNum
    )

    const merged = mergeWithTranslation(productNum, match)
    if (merged.priceIrr !== undefined) {
      merged.priceLabel = formatPrice(merged.priceIrr, "en")
    }
    productCache.set(productNum, merged)
    return merged
  } catch {
    const fallback = mergeWithTranslation(productNum)
    productCache.set(productNum, fallback)
    return fallback
  }
}

export async function fetchAllMergedProducts(
  locale: Locale
): Promise<MergedProduct[]> {
  const nums = Array.from({ length: 23 }, (_, i) => i + 1)
  const products = await Promise.all(
    nums.map((n) => fetchMedusaProductByNum(n))
  )
  return products.map((p) => ({
    ...p,
    priceLabel:
      p.priceIrr !== undefined ? formatPrice(p.priceIrr, locale) : undefined,
  }))
}

export function getLocalizedProductName(
  product: MergedProduct,
  locale: Locale
): string {
  return tx(product.name, locale)
}

export function clearProductCache() {
  productCache.clear()
  regionIdCache = null
}

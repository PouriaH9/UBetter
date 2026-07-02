import { readFileSync } from "fs"
import { join } from "path"
import { CreateInventoryLevelInput, ExecArgs } from "@medusajs/framework/types"
import {
  ContainerRegistrationKeys,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils"
import {
  createApiKeysWorkflow,
  createInventoryLevelsWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createShippingProfilesWorkflow,
  createStockLocationsWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
  updateStoresWorkflow,
} from "@medusajs/medusa/core-flows"

type CatalogItem = {
  productNum: number
  categoryId: string
  categoryTitle: string
  name: string
  subcategory: string
  description: string
  features: string[]
  applications: string[]
  imageFile: string
}

const CATEGORY_LABELS: Record<string, string> = {
  residential: "Residential & Villa",
  commercial: "Commercial & Office",
  industrial: "Industrial",
  solar: "Solar & Hybrid",
  "large-scale": "Large Projects & Microgrid",
  ups: "Smart Energy Storage",
}

export default async function seedUbetterProducts({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const link = container.resolve(ContainerRegistrationKeys.LINK)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT)
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL)
  const storeModuleService = container.resolve(Modules.STORE)

  const dataDir = join(process.cwd(), "data")
  const catalog: CatalogItem[] = JSON.parse(
    readFileSync(join(dataDir, "catalog.json"), "utf8")
  )
  const prices: Record<string, number> = JSON.parse(
    readFileSync(join(dataDir, "product-prices.json"), "utf8")
  )

  const storefrontUrl = process.env.STOREFRONT_URL || "http://localhost:3000"
  const imageUrl = (file: string) =>
    `${storefrontUrl}/products/${encodeURIComponent(file)}`

  logger.info("Seeding UBetter store setup...")

  const [store] = await storeModuleService.listStores()
  let defaultSalesChannel = await salesChannelModuleService.listSalesChannels({
    name: "Default Sales Channel",
  })

  if (!defaultSalesChannel.length) {
    const { result } = await createSalesChannelsWorkflow(container).run({
      input: {
        salesChannelsData: [{ name: "Default Sales Channel" }],
      },
    })
    defaultSalesChannel = result
  }

  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: {
        default_sales_channel_id: defaultSalesChannel[0].id,
        supported_currencies: [{ currency_code: "irr", is_default: true }],
      },
    },
  })

  const { result: regionResult } = await createRegionsWorkflow(container).run({
    input: {
      regions: [
        {
          name: "Iran",
          currency_code: "irr",
          countries: ["ir"],
          payment_providers: ["pp_zarinpal_zarinpal"],
        },
      ],
    },
  })
  const region = regionResult[0]

  await createTaxRegionsWorkflow(container).run({
    input: [{ country_code: "ir", provider_id: "tp_system" }],
  })

  const { result: stockLocationResult } = await createStockLocationsWorkflow(
    container
  ).run({
    input: {
      locations: [
        {
          name: "UBetter Iran Warehouse",
          address: {
            city: "Tehran",
            country_code: "ir",
            address_1: "UBetter Energy",
          },
        },
      ],
    },
  })
  const stockLocation = stockLocationResult[0]

  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: { default_location_id: stockLocation.id },
    },
  })

  await link.create({
    [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
    [Modules.FULFILLMENT]: { fulfillment_provider_id: "manual_manual" },
  })

  const shippingProfiles = await fulfillmentModuleService.listShippingProfiles({
    type: "default",
  })
  let shippingProfile = shippingProfiles[0]
  if (!shippingProfile) {
    const { result } = await createShippingProfilesWorkflow(container).run({
      input: { data: [{ name: "Default Shipping Profile", type: "default" }] },
    })
    shippingProfile = result[0]
  }

  const fulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
    name: "Iran delivery",
    type: "shipping",
    service_zones: [
      {
        name: "Iran",
        geo_zones: [{ country_code: "ir", type: "country" }],
      },
    ],
  })

  await link.create({
    [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
    [Modules.FULFILLMENT]: { fulfillment_set_id: fulfillmentSet.id },
  })

  await createShippingOptionsWorkflow(container).run({
    input: [
      {
        name: "Standard Delivery",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: fulfillmentSet.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Standard",
          description: "Delivery within Iran",
          code: "standard",
        },
        prices: [
          { currency_code: "irr", amount: 0 },
          { region_id: region.id, amount: 0 },
        ],
        rules: [
          { attribute: "enabled_in_store", value: "true", operator: "eq" },
          { attribute: "is_return", value: "false", operator: "eq" },
        ],
      },
    ],
  })

  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: { id: stockLocation.id, add: [defaultSalesChannel[0].id] },
  })

  const { data: existingKeys } = await query.graph({
    entity: "api_key",
    fields: ["id", "token"],
    filters: { type: "publishable" },
  })

  let publishableApiKey: { id: string; token?: string } | null = existingKeys?.[0] ?? null
  if (!publishableApiKey) {
    const { result } = await createApiKeysWorkflow(container).run({
      input: {
        api_keys: [
          { title: "UBetter Storefront", type: "publishable", created_by: "" },
        ],
      },
    })
    publishableApiKey = result[0]
  }

  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: { id: publishableApiKey!.id, add: [defaultSalesChannel[0].id] },
  })

  logger.info(`Publishable API key: ${publishableApiKey?.token ?? publishableApiKey?.id}`)

  const uniqueCategoryIds = [...new Set(catalog.map((p) => p.categoryId))]
  const { result: categoryResult } = await createProductCategoriesWorkflow(
    container
  ).run({
    input: {
      product_categories: uniqueCategoryIds.map((id) => ({
        name: CATEGORY_LABELS[id] || id,
        handle: id,
        is_active: true,
      })),
    },
  })

  const categoryMap = Object.fromEntries(
    categoryResult.map((c) => [c.handle || c.name, c.id])
  )

  const productsInput = catalog.map((item) => {
    const priceIrr = (prices[String(item.productNum)] || 100000000) * 10
    const categoryId = categoryMap[item.categoryId]

    return {
      title: item.name,
      handle: `ess-${String(item.productNum).padStart(3, "0")}`,
      description: item.description,
      status: ProductStatus.PUBLISHED,
      category_ids: categoryId ? [categoryId] : [],
      shipping_profile_id: shippingProfile.id,
      images: [{ url: imageUrl(item.imageFile) }],
      metadata: {
        legacy_product_num: item.productNum,
        purchase_mode: "online",
        subcategory_en: item.subcategory,
        features_en: JSON.stringify(item.features),
        applications_en: JSON.stringify(item.applications),
      },
      options: [{ title: "Default", values: ["Standard"] }],
      variants: [
        {
          title: "Standard",
          sku: `ESS-${String(item.productNum).padStart(3, "0")}`,
          manage_inventory: true,
          options: { Default: "Standard" },
          prices: [{ currency_code: "irr", amount: priceIrr }],
        },
      ],
      sales_channels: [{ id: defaultSalesChannel[0].id }],
    }
  })

  const { result: createdProducts } = await createProductsWorkflow(container).run({
    input: { products: productsInput as never },
  })

  logger.info("Seeding inventory levels...")
  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id"],
  })

  const inventoryLevels: CreateInventoryLevelInput[] = []
  for (const inventoryItem of inventoryItems ?? []) {
    inventoryLevels.push({
      inventory_item_id: inventoryItem.id,
      location_id: stockLocation.id,
      stocked_quantity: 100,
    })
  }

  if (inventoryLevels.length) {
    await createInventoryLevelsWorkflow(container).run({
      input: { inventory_levels: inventoryLevels },
    })
  }

  logger.info(`Seeded ${createdProducts.length} UBetter products.`)
}

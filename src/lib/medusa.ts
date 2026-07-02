import Medusa from "@medusajs/js-sdk"

const baseUrl =
  process.env.NEXT_PUBLIC_MEDUSA_URL || "http://localhost:9000"

const publishableKey =
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

export const medusa = new Medusa({
  baseUrl,
  publishableKey,
  debug: process.env.NODE_ENV === "development",
})

export const MEDUSA_ENABLED = Boolean(
  process.env.NEXT_PUBLIC_MEDUSA_URL &&
    process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
)

export const CART_ID_KEY = "ube_medusa_cart_id"
export const REGION_ID_KEY = "ube_medusa_region_id"

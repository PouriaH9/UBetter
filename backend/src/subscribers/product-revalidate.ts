import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"

export default async function productUpdatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const storefrontUrl = process.env.STOREFRONT_URL
  const secret = process.env.REVALIDATE_SECRET
  if (!storefrontUrl || !secret) return

  const productId = data.id
  const tags = [`product-${productId}`, "products"]

  for (const tag of tags) {
    try {
      await fetch(
        `${storefrontUrl}/api/revalidate?secret=${secret}&tags=${encodeURIComponent(tag)}`,
        { method: "POST" }
      )
    } catch {
      // Storefront may be offline during backend-only deploys
    }
  }
}

export const config: SubscriberConfig = {
  event: "product.updated",
}

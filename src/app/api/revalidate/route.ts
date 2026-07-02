import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret")
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
  }

  const tags = req.nextUrl.searchParams.get("tags")
  if (!tags) {
    return NextResponse.json({ message: "No tags provided" }, { status: 400 })
  }

  for (const tag of tags.split(",")) {
    const trimmed = tag.trim()
    if (trimmed.startsWith("product-")) {
      const productNum = trimmed.replace("product-", "")
      revalidatePath(`/fa/products/${productNum}`)
      revalidatePath(`/en/products/${productNum}`)
      revalidatePath(`/zh/products/${productNum}`)
      revalidatePath(`/de/products/${productNum}`)
    }
  }

  revalidatePath("/fa/products")
  revalidatePath("/en/products")
  revalidatePath("/zh/products")
  revalidatePath("/de/products")

  return NextResponse.json({ revalidated: true, tags: tags.split(",") })
}

import { randomUUID } from "crypto"
import { mkdirSync, writeFileSync } from "fs"
import { join } from "path"
import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

type EnquiryItem = {
  productNum: number
  name: string
  category: string
  qty: number
}

type EnquiryBody = {
  fullName: string
  phone: string
  email?: string
  company?: string
  province: string
  city?: string
  buildingType: string
  capacity?: string
  timeline?: string
  budget?: string
  notes?: string
  items: EnquiryItem[]
  locale?: string
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const body = req.body as EnquiryBody
  const logger = req.scope.resolve(ContainerRegistrationKeys.LOGGER)

  if (!body?.fullName || !body?.phone || !body?.province || !body?.buildingType) {
    return res.status(400).json({ message: "Missing required fields" })
  }

  const id = randomUUID()
  const record = {
    id,
    ...body,
    submitted_at: new Date().toISOString(),
  }

  const dir = join(process.cwd(), "uploads", "enquiries")
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, `${id}.json`), JSON.stringify(record, null, 2))

  logger.info(`New enquiry received: ${id} from ${body.fullName}`)

  return res.status(201).json({
    id,
    message: "Enquiry submitted successfully",
  })
}

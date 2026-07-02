import {
  AbstractPaymentProvider,
  PaymentActions,
  PaymentSessionStatus,
} from "@medusajs/framework/utils"
import type {
  AuthorizePaymentInput,
  AuthorizePaymentOutput,
  CancelPaymentInput,
  CancelPaymentOutput,
  CapturePaymentInput,
  CapturePaymentOutput,
  DeletePaymentInput,
  DeletePaymentOutput,
  GetPaymentStatusInput,
  GetPaymentStatusOutput,
  InitiatePaymentInput,
  InitiatePaymentOutput,
  ProviderWebhookPayload,
  RefundPaymentInput,
  RefundPaymentOutput,
  RetrievePaymentInput,
  RetrievePaymentOutput,
  UpdatePaymentInput,
  UpdatePaymentOutput,
  WebhookActionResult,
} from "@medusajs/framework/types"
// eslint-disable-next-line @typescript-eslint/no-require-imports
const ZarinpalCheckout = require("zarinpal-checkout")

type ZarinpalOptions = {
  merchantId: string
  sandbox?: boolean
  currency?: "IRR" | "IRT"
  callbackUrl?: string
}

type ZarinpalClient = {
  PaymentRequest: (input: {
    Amount: number
    CallbackURL: string
    Description: string
    Email?: string
    Mobile?: string
  }) => Promise<{ status: number; authority?: string; url?: string }>
  PaymentVerification: (input: {
    Amount: number
    Authority: string
  }) => Promise<{ status: number; RefID?: number }>
}

export default class ZarinpalPaymentProviderService extends AbstractPaymentProvider<ZarinpalOptions> {
  static identifier = "zarinpal"

  protected client_: ZarinpalClient
  protected options_: ZarinpalOptions

  constructor(container: Record<string, unknown>, options: ZarinpalOptions) {
    super(container, options)
    this.options_ = options
    this.client_ = ZarinpalCheckout.create(
      options.merchantId,
      options.sandbox ?? false,
      options.currency ?? "IRT"
    )
  }

  private getCallbackUrl(): string {
    return (
      this.options_.callbackUrl ||
      `${process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"}/hooks/payment/zarinpal_zarinpal`
    )
  }

  private toGatewayAmount(amount: number, currencyCode: string): number {
    const code = currencyCode.toLowerCase()
    if (code === "irr") {
      return Math.round(amount / 10)
    }
    return Math.round(amount)
  }

  async initiatePayment({
    amount,
    currency_code,
    data,
    context,
  }: InitiatePaymentInput): Promise<InitiatePaymentOutput> {
    const sessionId = (data?.session_id as string) || context?.idempotency_key
    const gatewayAmount = this.toGatewayAmount(Number(amount), currency_code)

    const request = await this.client_.PaymentRequest({
      Amount: gatewayAmount,
      CallbackURL: this.getCallbackUrl(),
      Description: `UBetter Energy order ${sessionId || ""}`.trim(),
      Email: context?.customer?.email ?? undefined,
      Mobile: context?.customer?.phone ?? undefined,
    })

    if (request.status !== 100 || !request.authority || !request.url) {
      throw new Error("Zarinpal payment request failed")
    }

    return {
      id: request.authority,
      status: PaymentSessionStatus.REQUIRES_MORE,
      data: {
        authority: request.authority,
        url: request.url,
        session_id: sessionId,
        amount: gatewayAmount,
      },
    }
  }

  async authorizePayment(input: AuthorizePaymentInput): Promise<AuthorizePaymentOutput> {
    const authority = (input.data?.authority as string) || (input.data?.id as string)
    const amount = Number(input.data?.amount || 0)

    if (!authority) {
      return { status: PaymentSessionStatus.ERROR, data: input.data || {} }
    }

    const verification = await this.client_.PaymentVerification({
      Authority: authority,
      Amount: amount,
    })

    if (verification.status === 100) {
      return {
        status: PaymentSessionStatus.AUTHORIZED,
        data: {
          ...input.data,
          authority,
          ref_id: verification.RefID,
        },
      }
    }

    return {
      status: PaymentSessionStatus.CANCELED,
      data: input.data || {},
    }
  }

  async capturePayment({ data }: CapturePaymentInput): Promise<CapturePaymentOutput> {
    return { data: data || {} }
  }

  async cancelPayment({ data }: CancelPaymentInput): Promise<CancelPaymentOutput> {
    return { data: data || {} }
  }

  async deletePayment({ data }: DeletePaymentInput): Promise<DeletePaymentOutput> {
    return { data: data || {} }
  }

  async getPaymentStatus(input: GetPaymentStatusInput): Promise<GetPaymentStatusOutput> {
    if (input.data?.ref_id) {
      return { status: PaymentSessionStatus.CAPTURED, data: input.data }
    }
    if (input.data?.authority) {
      return { status: PaymentSessionStatus.REQUIRES_MORE, data: input.data }
    }
    return { status: PaymentSessionStatus.PENDING, data: input.data || {} }
  }

  async refundPayment({ data }: RefundPaymentInput): Promise<RefundPaymentOutput> {
    return { data: data || {} }
  }

  async retrievePayment({ data }: RetrievePaymentInput): Promise<RetrievePaymentOutput> {
    return { data: data || {} }
  }

  async updatePayment({ data }: UpdatePaymentInput): Promise<UpdatePaymentOutput> {
    return { status: PaymentSessionStatus.REQUIRES_MORE, data: data || {} }
  }

  async getWebhookActionAndData(
    payload: ProviderWebhookPayload["payload"]
  ): Promise<WebhookActionResult> {
    const rawData = payload.rawData
    const raw =
      typeof rawData === "string"
        ? Object.fromEntries(new URLSearchParams(rawData))
        : rawData && typeof rawData === "object" && !Buffer.isBuffer(rawData)
          ? (rawData as Record<string, string>)
          : {}
    const authority = raw?.Authority || raw?.authority
    const status = raw?.Status || raw?.status
    const sessionId = raw?.session_id

    if (!authority) {
      return { action: PaymentActions.NOT_SUPPORTED }
    }

    if (status === "NOK" || status === "nok") {
      return {
        action: PaymentActions.FAILED,
        data: { session_id: sessionId, amount: 0 },
      }
    }

    return {
      action: PaymentActions.AUTHORIZED,
      data: { session_id: sessionId, amount: 0 },
    }
  }
}

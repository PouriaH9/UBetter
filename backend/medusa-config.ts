import { loadEnv, defineConfig } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

const workerMode = (process.env.WORKER_MODE || "shared") as
  | "shared"
  | "worker"
  | "server"

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    workerMode,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
  modules: [
    {
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: [
          {
            resolve: "./src/modules/zarinpal",
            id: "zarinpal",
            options: {
              merchantId: process.env.ZARINPAL_MERCHANT_ID || "",
              sandbox: process.env.ZARINPAL_SANDBOX === "true",
              currency: process.env.ZARINPAL_CURRENCY || "IRT",
              callbackUrl: process.env.ZARINPAL_CALLBACK_URL || "",
            },
          },
        ],
      },
    },
  ],
})

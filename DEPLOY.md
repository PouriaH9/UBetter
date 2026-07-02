# UBetterEnergy — Medusa VPS Deployment

This guide covers deploying the Medusa v2 backend on your VPS with Docker Compose and connecting the Vercel-hosted Next.js storefront.

## Architecture

- **Storefront:** Vercel (`ubetterenergy.com`)
- **Medusa API + Admin:** VPS via Docker (`api.ubetterenergy.com`)
- **Database:** PostgreSQL 16 (Docker volume)
- **Cache / events:** Redis 7 (Docker volume)
- **Payment:** Zarinpal (custom provider)

## 1. VPS prerequisites

- Ubuntu 22.04+ (or similar Linux)
- 4 GB+ RAM recommended
- Docker Engine + Docker Compose v2
- Domain DNS: `api.ubetterenergy.com` → VPS IP

## 2. Clone and configure

```bash
git clone <your-repo> /opt/ubetter-energy
cd /opt/ubetter-energy
cp backend/.env.example backend/.env
```

Edit root `.env` for Docker Compose (create at repo root):

```env
POSTGRES_PASSWORD=<strong-password>
JWT_SECRET=<random-64-chars>
COOKIE_SECRET=<random-64-chars>
STORE_CORS=https://ubetterenergy.com,https://www.ubetterenergy.com
ADMIN_CORS=https://api.ubetterenergy.com
AUTH_CORS=https://ubetterenergy.com,https://api.ubetterenergy.com
ZARINPAL_MERCHANT_ID=<your-merchant-id>
ZARINPAL_SANDBOX=false
ZARINPAL_CURRENCY=IRT
ZARINPAL_CALLBACK_URL=https://api.ubetterenergy.com/hooks/payment/zarinpal_zarinpal
STOREFRONT_URL=https://ubetterenergy.com
MEDUSA_BACKEND_URL=https://api.ubetterenergy.com
REVALIDATE_SECRET=<random-secret>
```

Copy the same `REVALIDATE_SECRET` to Vercel env vars.

## 3. TLS with nginx

Place SSL certificates in `nginx/ssl/` (fullchain.pem + privkey.pem), then extend `nginx/nginx.conf` with a `listen 443 ssl` server block pointing to `medusa-server:9000`.

For Let's Encrypt, use certbot on the host and mount `/etc/letsencrypt` into the nginx container.

## 4. Build and start

```bash
docker compose up -d --build
docker compose exec medusa-server npx medusa db:migrate
docker compose exec medusa-server npm run seed:ubetter
```

The seed script prints the **publishable API key** — save it for the storefront.

## 5. Create admin user (first time)

```bash
docker compose exec medusa-server npx medusa user -e admin@ubetterenergy.com -p <password>
```

Admin UI: `https://api.ubetterenergy.com/app`

## 6. Vercel storefront env vars

In Vercel project settings:

```
NEXT_PUBLIC_MEDUSA_URL=https://api.ubetterenergy.com
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_<from-seed-or-admin>
REVALIDATE_SECRET=<same-as-backend>
```

Redeploy the storefront after setting env vars.

## 7. Zarinpal setup

1. Register at [zarinpal.com](https://www.zarinpal.com)
2. Set `ZARINPAL_MERCHANT_ID` in production `.env`
3. Set `ZARINPAL_SANDBOX=false` for production
4. In Medusa Admin → Settings → Regions → Iran → enable **Zarinpal** payment provider

## 8. Product prices

Edit [`backend/data/product-prices.json`](backend/data/product-prices.json) with real Toman prices (keys 1–23), then re-run:

```bash
docker compose exec medusa-server npm run seed:ubetter
```

Or update prices directly in Medusa Admin.

## 9. Local development

```bash
# Start Postgres + Redis
npm run dev:db

# Terminal 1 — Medusa backend
cd backend && cp .env.example .env && npm install
npx medusa db:migrate
npm run seed:ubetter
npm run dev

# Terminal 2 — Next.js storefront
cp .env.local.example .env.local   # create with local Medusa URL + publishable key
npm run dev
```

## 10. Cache revalidation

When products are updated in Medusa Admin, the `product-revalidate` subscriber calls:

```
POST https://ubetterenergy.com/api/revalidate?secret=...&tags=product-<id>
```

Ensure `STOREFRONT_URL` and `REVALIDATE_SECRET` are set on the backend.

## 11. Enquiries

Quote requests are stored as JSON files in the Medusa container volume:

```
/app/uploads/enquiries/<uuid>.json
```

Mount `medusa-uploads` volume for persistence. Review enquiries on the VPS or sync the volume to backup storage.

## 12. Useful commands

```bash
docker compose logs -f medusa-server
docker compose restart medusa-server medusa-worker
docker compose exec postgres pg_dump -U medusa medusa > backup.sql
```

## 13. Updating prices / products

- **Admin UI:** `https://api.ubetterenergy.com/app` → Products
- **Re-seed:** update `backend/data/catalog.json` or `product-prices.json`, run `seed:ubetter`
- **Images:** served from storefront `public/products/` — update files and re-seed or change image URLs in Admin

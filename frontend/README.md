# CipherVault Frontend

The CipherVault frontend is a modern web interface built with Next.js, React, and Tailwind CSS. It provides dedicated interfaces for cryptographic workflows, theme selection, backend connectivity testing, and operational metrics.

## ✨ Features

- Next.js App Router architecture.
- React components and client-side interactions.
- Tailwind CSS styling.
- SHA-256 hashing interface.
- Dedicated RSA and ECC pages.
- Backend connection-testing page.
- Light and dark theme support.
- Reusable learning-content components.
- Metrics dashboard with refresh controls.
- Login, logout, and session API routes for metrics access.
- Production build and Docker support.

## 🧰 Technology Stack

| Technology | Purpose |
|---|---|
| Next.js | React framework |
| React | UI library |
| JavaScript | Application logic |
| Tailwind CSS | Styling |
| npm | Dependency management |
| ESLint | Linting |
| Docker | Containerization |

## 📁 Directory Structure

```text
frontend/
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   │   └── route.js
│   │   │   │   ├── logout/
│   │   │   │   │   └── route.js
│   │   │   │   └── session/
│   │   │   │       └── route.js
│   │   │   └── metrics/
│   │   │       └── route.js
│   │   ├── connection-test/
│   │   │   └── page.js
│   │   ├── content/
│   │   │   ├── learning-content.js
│   │   │   └── learning-modal.js
│   │   ├── ecc/
│   │   │   └── page.js
│   │   ├── hash/
│   │   │   └── page.js
│   │   ├── metrics/
│   │   │   └── page.js
│   │   ├── rsa/
│   │   │   └── page.js
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.js
│   │   ├── page.js
│   │   ├── theme-provider.js
│   │   └── theme-toggle.js
│   ├── components/
│   │   └── metrics-login.js
│   └── lib/
│       └── metrics-auth.js
├── .dockerignore
├── .gitignore
├── Dockerfile
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Prerequisites

- Node.js 22
- npm
- Git
- Docker (optional)

## 🚀 Local Setup

### 1. Install dependencies

From the repository root:

```powershell
cd frontend
npm ci
```

### 2. Configure the backend URL

Review `next.config.mjs` for the API rewrite configuration.

The default hosted backend is:

```text
https://ciphervault-backend.fastapicloud.dev
```

Use the configuration supported by `next.config.mjs` to point the application at a local or alternative backend.

### 3. Start the development server

```bash
npm run dev
```

Open:

http://localhost:3000

## 🛠️ Available Scripts

The following commands are defined for the frontend workflow:

```bash
npm run dev
npm run lint
npm run build
npm run start
```

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run lint` | Run ESLint checks |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server after building |

## 🔐 Metrics Dashboard

The metrics page is available at:

`/metrics`

It retrieves Prometheus-formatted data through the frontend API route and displays available backend information, including request counts, error counts, process memory, CPU time, and request-latency statistics.

The dashboard includes manual and automatic refresh controls.

The metrics login, logout, and session endpoints are implemented under:

- `/api/auth/login`
- `/api/auth/logout`
- `/api/auth/session`

The metrics proxy is implemented under:

- `/api/metrics`

These endpoints depend on the current server-side authentication and environment configuration. Verify authentication behavior and backend connectivity in the deployed environment before relying on the dashboard.

## 🔌 Backend Integration

The frontend communicates with the backend through the configured Next.js API rewrite and API routes.

When running locally:

1. Start the backend.
2. Verify that its health endpoint responds.
3. Confirm the frontend points to the intended backend URL.
4. Start the frontend.
5. Test the relevant application pages.

## 🐳 Docker

Build the frontend image from the repository root:

```bash
docker build -t ciphervault-frontend ./frontend
```

Run the container:

```bash
docker run --rm -p 3000:3000 \
  -e BACKEND_URL=https://ciphervault-backend.fastapicloud.dev \
  ciphervault-frontend
```

Review the Dockerfile and Next.js configuration for the current standalone build and runtime requirements.

## 🌐 Deployment

The hosted frontend is available at:

https://cipher-vault-theta.vercel.app/

The frontend is deployed using Vercel.

Configure production environment variables through Vercel project settings. Keep private credentials and signing secrets server-side; do not expose them using `NEXT_PUBLIC_` variables.

## 🔄 Continuous Integration

The frontend workflow is located at:

`.github/workflows/frontend-ci.yml`

It installs dependencies, runs ESLint, and creates a production build.

## 🔐 Security

- Do not commit `.env.local` or other files containing credentials.
- Keep passwords, private keys, and signing secrets out of client-side JavaScript.
- Use server-side routes for operations requiring private configuration.
- Protect metrics and diagnostic endpoints appropriately.
- Verify login, logout, session expiry, and API authorization before production use.

## 👤 Maintainer

**DS Rathore** — https://github.com/dsrathore1

For backend API setup and testing, see `backend/README.md`. For the overall architecture and CI/CD workflow, see the root README.

# CipherVault Frontend

The CipherVault frontend is a responsive web application built with Next.js, React, JavaScript, and Tailwind CSS. It provides an interactive interface for exploring cryptographic operations, viewing results, and monitoring backend metrics.

The application includes SHA-256 hashing, RSA encryption and decryption, ECC digital signatures, and a dark/light theme toggle.

## ✨ Features

- **Cryptography tools:** Interactive interfaces for SHA-256, RSA, and ECC.
- **SHA-256 hashing:** Generate and copy cryptographic digests.
- **RSA encryption and decryption:** Interact with the backend's RSA-2048 OAEP implementation.
- **ECC digital signatures:** Sign messages and verify signatures using ECDSA.
- **Prometheus metrics dashboard:** Inspect request statistics, errors, process memory, and latency metrics when available.
- **Dark and light themes:** Switch between themes using `next-themes`.
- **Input validation:** Display validation errors and handle unsuccessful requests.
- **Backend connectivity:** Check backend health through the API.
- **Responsive design:** Use the application across desktop and smaller screens.
- **Client-side navigation:** Navigate between pages using Next.js.

## 🛠️ Technology Stack

| Component | Technology |
|---|---|
| Framework | Next.js |
| UI Library | React |
| Language | JavaScript |
| Styling | Tailwind CSS |
| Theme Management | next-themes |
| HTTP Requests | Fetch API |
| Backend | Python FastAPI |
| Containerization | Docker |

## 🚀 Getting Started

### Prerequisites

Install Node.js and npm. A compatible Node.js version should be used for the version specified by the project's configuration.

### 1. Navigate to the frontend directory

From the repository root, run:

**Windows PowerShell:**

```powershell
cd frontend
```

**Linux or WSL:**

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open the application:

http://localhost:3000

Keep the development server running while using the application.

## 📄 Application Routes

| Route | Description |
|---|---|
| `/` | Main application landing page |
| `/hash` | SHA-256 hashing interface |
| `/connection-test` | Backend connectivity test |
| `/metrics` | Prometheus metrics dashboard |

The RSA and ECC interfaces are available through the application's cryptography tools and navigation.

## 🔌 Backend Integration

The frontend communicates with the FastAPI backend through its `/api` proxy routes.

The Next.js rewrite configuration uses the `BACKEND_URL` environment variable when provided. Otherwise, it defaults to the deployed CipherVault backend:

https://ciphervault-backend.fastapicloud.dev

For local development, configure `BACKEND_URL` to point to the local backend when required by the application's configuration:

```text
BACKEND_URL=http://127.0.0.1:8000
```

Restart the Next.js development server after changing environment configuration.

### API proxy routes

| Frontend route | Purpose |
|---|---|
| `/api/health` | Backend health check |
| `/api/hash` | SHA-256 hashing |
| `/api/rsa/encrypt-decrypt` | RSA encryption/decryption |
| `/api/ecc/sign-verify` | ECC signing/verification |
| `/api/metrics` | Prometheus metrics retrieval |

The frontend forwards requests to the corresponding backend endpoints. Refer to the backend's interactive API documentation for request schemas and response details.

## 📊 Prometheus Metrics Dashboard

Open the dashboard at:

http://localhost:3000/metrics

The page retrieves Prometheus metrics through `/api/metrics` and presents selected operational information, including:

- Total HTTP requests
- Error response counts
- Process memory usage
- Average request latency, when suitable metrics are available
- Route-level request statistics

The dashboard supports manual refresh and periodic refresh. Metric values depend on the data returned by the backend.

## 🐳 Docker

From the repository root, build and start the application using the project's Compose configuration:

```bash
docker compose up --build -d
```

Open:

http://localhost:3000

Inspect the container status:

```bash
docker compose ps
```

View frontend logs:

```bash
docker compose logs -f frontend
```

Stop the services:

```bash
docker compose down
```

The current Compose configuration runs the frontend container and configures it to proxy API requests to the deployed backend.

## 🧪 Development Commands

Run these commands from the frontend directory:

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the production application |
| `npm run start` | Start the production server after a successful build |
| `npm run lint` | Run the configured lint command, if available in `package.json` |

Run the production build before committing frontend changes:

```bash
npm run build
```

## 🎨 Design Principles

- Consistent dark and light theme support.
- Clear typography and readable contrast.
- Balanced card layouts and visual hierarchy.
- Responsive layouts for different screen sizes.
- Helpful loading, validation, and error states.
- A functional interface without unnecessary visual complexity.

## 🔒 Security Notes

- Do not place private keys, API credentials, or secrets in client-side code.
- Frontend validation improves usability but does not replace backend validation.
- Use HTTPS for deployed environments.
- Treat cryptographic demonstrations as educational tools rather than a substitute for a security-reviewed production system.

## 📌 Project Status

The frontend integrates the SHA-256, RSA, and ECC backend operations and includes a dedicated Prometheus metrics dashboard. The project is under active development, with further usability, testing, and documentation improvements possible.

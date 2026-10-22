# ◈ CipherVault

### An Interactive Cryptography Learning Platform

CipherVault is a web-based platform for exploring cryptographic concepts through practical tools and interactive demonstrations. It combines a modern Next.js frontend with a Python FastAPI backend to make cryptography easier to understand and experiment with.

The platform currently supports SHA-256 hashing, RSA-2048 encryption and decryption, and Elliptic Curve Cryptography (ECC) digital signatures.

## ✨ Features

- **SHA-256 Hashing:** Generate 256-bit cryptographic digests from text.
- **RSA-2048 Encryption and Decryption:** Explore public-key cryptography using RSA-OAEP with SHA-256.
- **ECC Digital Signatures:** Sign and verify messages using ECDSA with the NIST P-256 curve and SHA-256.
- **Input Validation:** Validate requests and handle invalid inputs.
- **Copy to Clipboard:** Copy cryptographic results conveniently.
- **REST API:** Use FastAPI endpoints for cryptographic operations.
- **Health Checks:** Verify backend availability.
- **Prometheus Monitoring:** Expose application metrics for monitoring and analysis.
- **Dark and Light Themes:** Switch between themes using the frontend theme toggle.
- **Responsive Interface:** Explore cryptographic tools through a clean, interactive interface.
- **Docker Support:** Build and run the application using Docker and Docker Compose.

## 🛠️ Technology Stack

| Component | Technology |
|---|---|
| Frontend | Next.js, React, JavaScript |
| Styling | Tailwind CSS |
| Theme Management | next-themes |
| Backend | Python, FastAPI |
| ASGI Server | Uvicorn |
| Cryptographic Library | Python `cryptography` |
| Hashing | Python `hashlib` |
| Monitoring | Prometheus FastAPI Instrumentator |
| Testing | pytest |
| Linting | Ruff |
| Containerization | Docker, Docker Compose |
| CI | GitHub Actions |

## 🏗️ Architecture

CipherVault uses a frontend-backend architecture.

1. The user interacts with the Next.js frontend.
2. The frontend sends requests to the backend through the `/api` proxy.
3. FastAPI validates requests and performs the requested cryptographic operation.
4. The backend returns results in JSON format.
5. Prometheus-compatible metrics are exposed for monitoring.

The frontend can use the deployed backend or a locally running backend, depending on the configured environment.

## 🚀 Getting Started

### Prerequisites

Install the following tools:

- [Git](https://git-scm.com/)
- [Python](https://www.python.org/downloads/)
- [Node.js and npm](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) or Docker Engine with Docker Compose, if using containers

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd CipherVault
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your repository's actual URL.

### 2. Start the backend

Open a terminal in the repository root.

**Windows PowerShell:**

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload
```

**Linux or WSL:**

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload
```

The local backend is available at:

- API base: http://127.0.0.1:8000
- Interactive API documentation: http://127.0.0.1:8000/docs
- Health check: http://127.0.0.1:8000/health
- Prometheus metrics: http://127.0.0.1:8000/metrics

Keep the backend terminal running.

### 3. Start the frontend

Open a second terminal in the repository root.

```bash
cd frontend
npm install
npm run dev
```

Open the application at:

http://localhost:3000

The frontend's `/api/*` routes proxy requests to the configured backend. When running locally, ensure the backend URL configuration points to your local API if you want to use the local backend rather than the deployed service.

### 4. Run tests and quality checks

From the `backend` directory, activate the virtual environment and run:

```bash
python -m pytest -v
python -m ruff check .
python -m pip check
```

From the `frontend` directory, run:

```bash
npm run build
```

These commands test the backend, check Python code quality and dependencies, and build the frontend for production.

## 🐳 Run with Docker Compose

From the repository root, where `docker-compose.yml` is located:

```bash
docker compose up --build -d
```

Open the frontend at:

http://localhost:3000

Check the container status:

```bash
docker compose ps
```

View service logs:

```bash
docker compose logs -f
```

Stop the services:

```bash
docker compose down
```

The Compose configuration currently runs the frontend container and configures it to proxy API requests to the deployed backend.

## 📦 Docker Hub Images

Prebuilt images are available under the Docker Hub account `prayagraj55`.

| Component | Image |
|---|---|
| Backend | `prayagraj55/ciphervault-backend:latest` |
| Frontend | `prayagraj55/ciphervault-frontend:latest` |

- [Backend image repository](https://hub.docker.com/r/prayagraj55/ciphervault-backend)
- [Frontend image repository](https://hub.docker.com/r/prayagraj55/ciphervault-frontend)

Pull the images:

```bash
docker pull prayagraj55/ciphervault-backend:latest
docker pull prayagraj55/ciphervault-frontend:latest
```

To run the application using the published images, use a Compose configuration that references these images and provides the required backend URL. The published images are backups of the built application; ensure their configuration matches your intended deployment environment.

## 🔌 API Reference

The backend provides the following principal endpoints.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/health` | Check backend availability |
| POST | `/hash` | Generate a SHA-256 digest |
| POST | `/rsa/encrypt-decrypt` | Perform RSA encryption/decryption operations |
| POST | `/ecc/sign-verify` | Perform ECC signing/verification operations |
| GET | `/metrics` | Expose Prometheus metrics |

Request and response schemas are available through the interactive API documentation:

http://127.0.0.1:8000/docs

### Example: SHA-256

Request:

```http
POST /hash
Content-Type: application/json
```

JSON body:

```json
{
  "text": "CipherVault"
}
```

The API returns the input, the selected hashing algorithm, and the generated digest in JSON format.

### Frontend API routes

The frontend exposes corresponding proxy routes under `/api`, including:

- `/api/health`
- `/api/hash`
- `/api/rsa/encrypt-decrypt`
- `/api/ecc/sign-verify`
- `/api/metrics`

The proxy forwards requests to the configured backend. Backend endpoint availability and response schemas should be verified against the running application.

## 📊 Prometheus Monitoring

CipherVault exposes a Prometheus-compatible metrics endpoint through the FastAPI backend.

Backend metrics endpoint:

http://127.0.0.1:8000/metrics

The frontend includes a dedicated metrics dashboard at:

http://localhost:3000/metrics

The dashboard presents request statistics, response errors, process memory information, and request latency where the corresponding metrics are available.

Metrics can help developers inspect application activity and diagnose performance issues during development and deployment.

## 🔐 Cryptographic Concepts

### SHA-256

SHA-256 is a cryptographic hash function that produces a 256-bit digest. It is useful for understanding data integrity and digital fingerprints.

Hashing is a one-way operation; it is not encryption and does not provide a decryption operation.

### RSA-2048

RSA is a public-key cryptographic algorithm. CipherVault demonstrates RSA encryption and decryption using RSA-2048 with OAEP padding and SHA-256.

For this configuration, the maximum plaintext size per encryption operation is 190 bytes. Longer messages require a different design, such as hybrid encryption.

### Elliptic Curve Cryptography

ECC provides public-key cryptographic operations based on elliptic-curve mathematics. CipherVault demonstrates digital signatures using ECDSA, the SECP256R1 (NIST P-256) curve, and SHA-256.

Signing and verification demonstrate message authenticity and integrity. A digital signature is not encryption.

## 🔒 Security Considerations

- Do not enter confidential information, passwords, private keys, or production secrets into a learning application.
- SHA-256 hashing does not encrypt data and cannot be used to recover the original message.
- RSA encryption and ECDSA signatures serve different purposes.
- Use established cryptographic libraries instead of implementing cryptographic primitives from scratch.
- Validate requests on the backend, even when frontend validation is present.
- Protect private keys and never expose them in frontend code or public repositories.
- Configure CORS, HTTPS, secrets, and other security controls appropriately before production deployment.
- Treat educational demonstrations as learning tools, not as a substitute for a security-reviewed production cryptographic system.

## 🧪 Continuous Integration and Code Quality

The project includes backend checks through GitHub Actions and supports local testing with pytest, linting with Ruff, and dependency verification with pip.

Run the checks locally before pushing changes to your development branch.

## 🎯 Project Objective

CipherVault combines practical cryptography demonstrations with modern full-stack development. It provides experience with frontend development, REST APIs, cryptographic libraries, automated testing, containerization, CI, and application monitoring.

## 📌 Project Status

CipherVault is under active development. The core SHA-256, RSA, and ECC functionality, frontend integration, health endpoint, Docker configuration, and Prometheus monitoring have been implemented.

Future improvements may include expanded educational modules, additional automated frontend tests, and more comprehensive deployment and observability configurations.

## 📄 License

No open-source license has been selected yet. Until a license is added, do not assume the repository is licensed for unrestricted redistribution or reuse.

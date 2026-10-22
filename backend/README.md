# CipherVault Backend

The CipherVault backend is a Python FastAPI application that provides REST API endpoints for cryptographic operations, health checks, and application monitoring.

It powers the CipherVault Next.js frontend and demonstrates SHA-256 hashing, RSA-2048 encryption and decryption, and ECC digital signatures.

## ✨ Features

- **SHA-256 Hashing:** Generate SHA-256 digests from text input.
- **RSA-2048 Encryption and Decryption:** Use RSA-OAEP with SHA-256.
- **ECC Digital Signatures:** Sign and verify messages using ECDSA with the SECP256R1 curve and SHA-256.
- **Input Validation:** Validate API requests and reject invalid inputs.
- **Health Check:** Check backend availability through `/health`.
- **Prometheus Metrics:** Expose application and HTTP request metrics through `/metrics`.
- **Interactive API Documentation:** Explore endpoints and request schemas using FastAPI's Swagger UI.
- **Automated Tests:** Run backend tests with pytest.
- **Code Quality Checks:** Use Ruff for Python linting.

## 🛠️ Technology Stack

| Component | Technology |
|---|---|
| Language | Python |
| API Framework | FastAPI |
| ASGI Server | Uvicorn |
| Hashing | `hashlib` |
| Cryptography | `cryptography` |
| Monitoring | `prometheus-fastapi-instrumentator` |
| Testing | pytest |
| Linting | Ruff |
| Containerization | Docker |

## 🚀 Getting Started

### Prerequisites

Install Python and ensure it is available in your terminal.

### 1. Navigate to the backend directory

From the repository root:

**Windows PowerShell:**

```powershell id="px5hd8"
cd backend
```

**Linux or WSL:**

```bash id="5g49fe"
cd backend
```

### 2. Create a virtual environment

```bash id="3ns7od"
python -m venv .venv
```

### 3. Activate the virtual environment

**Windows PowerShell:**

```powershell id="67aq95"
.\.venv\Scripts\Activate.ps1
```

**Linux or WSL:**

```bash id="7lqgfm"
source .venv/bin/activate
```

If PowerShell blocks script activation, use an appropriate local execution-policy configuration or invoke the virtual environment's Python executable directly.

### 4. Install dependencies

```bash id="yd0e9n"
python -m pip install -r requirements.txt
```

### 5. Start the FastAPI server

```bash id="6f7b1p"
python -m uvicorn main:app --reload
```

The backend should be available at:

- API base: http://127.0.0.1:8000
- Interactive API documentation: http://127.0.0.1:8000/docs
- OpenAPI schema: http://127.0.0.1:8000/openapi.json
- Health check: http://127.0.0.1:8000/health
- Prometheus metrics: http://127.0.0.1:8000/metrics

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Checks backend availability |
| POST | `/hash` | Generates a SHA-256 digest |
| POST | `/rsa/encrypt-decrypt` | Performs RSA encryption/decryption |
| POST | `/ecc/sign-verify` | Performs ECC signing/verification |
| GET | `/metrics` | Exposes Prometheus metrics |

Use the interactive documentation at `/docs` to inspect the exact request and response schemas for each endpoint.

### SHA-256 Hashing

Example request:

```http id="f6qczg"
POST /hash
Content-Type: application/json
```

```json id="o4nd2q"
{
  "text": "CipherVault"
}
```

The endpoint returns the generated digest in JSON format.

### RSA Encryption and Decryption

The RSA implementation uses a 2048-bit key, OAEP padding, and SHA-256.

With this configuration, the maximum plaintext size for a single RSA encryption operation is 190 bytes. Longer messages require an appropriate hybrid-encryption design rather than direct RSA encryption.

### ECC Digital Signatures

The ECC implementation uses ECDSA with the SECP256R1 curve and SHA-256. It demonstrates signing a message and verifying its signature.

Digital signatures provide integrity and authenticity checks; they do not encrypt the message.

## 📊 Prometheus Monitoring

CipherVault exposes Prometheus-compatible metrics through:

http://127.0.0.1:8000/metrics

The endpoint provides HTTP request metrics and process information useful for monitoring application activity and performance.

The frontend's metrics dashboard is available at:

http://localhost:3000/metrics

When using the dashboard, ensure the frontend proxy is configured to reach the intended backend instance.

## 🧪 Testing

Run tests from the backend directory with the virtual environment activated:

```bash id="th87xq"
python -m pytest -v
```

Run linting:

```bash id="w9r5ck"
python -m ruff check .
```

Check installed dependencies:

```bash id="c3ms9w"
python -m pip check
```

These checks help verify application behavior, code quality, and dependency consistency.

## 🐳 Docker

From the repository root, build and start the application using the project's Docker Compose configuration:

```bash id="t6r3ob"
docker compose up --build -d
```

Check service status:

```bash id="i2ve4v"
docker compose ps
```

View logs:

```bash id="6rt7hd"
docker compose logs -f
```

The current Compose configuration runs the frontend and routes API requests to the configured deployed backend. To run the backend as a local container as part of a combined setup, use a Compose configuration that explicitly defines and connects both services.

## 🔒 Security Considerations

- SHA-256 is a hash function, not an encryption algorithm.
- Never expose private keys, credentials, or sensitive configuration in API responses.
- Validate incoming data on the server, regardless of frontend validation.
- Restrict CORS origins appropriately before production deployment.
- Use HTTPS for deployed environments.
- Protect private keys and avoid logging sensitive inputs.
- Use established cryptographic libraries rather than implementing cryptographic primitives from scratch.
- Treat this educational project as a demonstration, not a substitute for a security-reviewed production cryptographic service.

## 📌 Project Status

The backend includes SHA-256 hashing, RSA encryption/decryption, ECC signing/verification, health checks, Prometheus metrics, automated tests, and code-quality checks. The project remains under active development.

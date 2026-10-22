# CipherVault Backend

The CipherVault backend is a Python API service built with FastAPI. It provides the server-side functionality used by the frontend and exposes health and operational metrics endpoints.

## ✨ Features

- FastAPI application and REST API.
- Health endpoint for service availability checks.
- Backend cryptographic operations.
- Prometheus-compatible metrics instrumentation.
- Automated tests using Pytest and HTTPX.
- Linting with Ruff.
- Docker-based packaging and deployment.
- FastAPI Cloud deployment configuration.

## 🧰 Technology Stack

| Technology | Purpose |
|---|---|
| Python | Backend programming language |
| FastAPI | API framework |
| Uvicorn | ASGI development server |
| Pytest | Automated testing |
| HTTPX | API testing client |
| Ruff | Linting |
| Docker | Containerization |

## 📁 Directory Structure

```text
backend/
├── .fastapicloud/
│   ├── .gitignore
│   ├── cloud.json
│   └── README.md
├── tests/
│   └── test_main.py
├── .dockerignore
├── Dockerfile
├── Extra.txt
├── main.py
├── output.txt
├── requirements.txt
└── README.md
```

The `.fastapicloud` directory contains local deployment-linking metadata. Avoid publishing secrets or machine-specific configuration in documentation.

## ⚙️ Prerequisites

- Python 3.11
- pip
- Git
- Docker (optional)

## 🚀 Local Setup

### 1. Create a virtual environment

From the repository root:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

On Linux or macOS:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
```

### 2. Install dependencies

```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

### 3. Run the API

```bash
uvicorn main:app --reload
```

The default local server address is:

http://127.0.0.1:8000

When enabled by the application configuration, API documentation is available at:

- Swagger UI: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc

## 🔌 API Overview

| Endpoint | Method | Purpose |
|---|---|---|
| `/health` | GET | Backend health check |
| `/metrics` | GET | Operational metrics endpoint |
| `/docs` | GET | Interactive API documentation, when enabled |
| `/openapi.json` | GET | OpenAPI schema, when enabled |

Cryptographic API routes and request/response schemas are defined in `main.py`. Use the generated OpenAPI documentation to inspect the exact supported operations.

## 🧪 Testing

Run all tests:

```bash
pytest -v
```

Run the main test module:

```bash
pytest tests/test_main.py -v
```

Run Ruff:

```bash
ruff check main.py tests/test_main.py
```

Before submitting a change, confirm that tests and linting complete successfully.

## 🐳 Docker

Build the image from the repository root:

```bash
docker build -t ciphervault-backend ./backend
```

Run the container:

```bash
docker run --rm -p 8000:8000 ciphervault-backend
```

The Dockerfile defines the container startup command and runtime configuration.

## 🌐 Deployment

The hosted API is available at:

https://ciphervault-backend.fastapicloud.dev/

Health endpoint:

https://ciphervault-backend.fastapicloud.dev/health

CipherVault uses FastAPI Cloud for backend hosting. Configure deployment environment variables through the hosting platform rather than hardcoding credentials in application source code.

## 🔄 Continuous Integration

The backend workflow is located at:

`.github/workflows/backend-ci.yml`

It installs Python dependencies, runs Ruff, and executes the backend tests.

## 🔐 Security

- Never commit API keys, credentials, or production secrets.
- Validate request payloads and handle invalid input appropriately.
- Avoid exposing stack traces or sensitive implementation details to API clients.
- Review access controls on operational endpoints before public deployment.
- Use HTTPS in production.
- Treat metrics output as potentially sensitive operational information.

## 👤 Maintainer

**DS Rathore** — https://github.com/dsrathore1

See the root README for the overall project architecture and the frontend README for web application setup.

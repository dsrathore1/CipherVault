<h1 algin="center">

# CipherVault Backend

</h1>

The CipherVault backend is a Python FastAPI application that provides REST API endpoints for health checks and SHA-256 hash generation.

It acts as the backend service for the CipherVault Next.js frontend.

## ✨ Features

- FastAPI application.
- Health-check endpoint.
- SHA-256 hash-generation endpoint.
- Input validation.
- CORS configuration for local frontend communication.
- Interactive API documentation.

## 🛠️ Technology Stack

- Python
- FastAPI
- Uvicorn
- Python `hashlib`
- Python `cryptography` package

The current SHA-256 endpoint uses Python's built-in `hashlib` module.

## 🚀 Getting Started

### Prerequisites

Install Python and ensure it is available in PowerShell.

### 1. Navigate to the backend directory

```powershell
cd "$HOME\CipherVault\backend"
```

### 2. Create a virtual environment

```powershell
python -m venv .venv
```

### 3. Activate the virtual environment

```powershell
.\.venv\Scripts\Activate.ps1
```

If PowerShell blocks activation, use an appropriate local PowerShell execution-policy configuration or invoke the virtual environment's Python executable directly.

### 4. Install dependencies

```powershell
python -m pip install -r requirements.txt
```

### 5. Start the FastAPI server

```powershell
python -m uvicorn main:app --reload
```

The backend should be available at:

- API base URL: `http://127.0.0.1:8000`
- Interactive documentation: `http://127.0.0.1:8000/docs`
- OpenAPI schema: `http://127.0.0.1:8000/openapi.json`

## 🔌 API Endpoints

### `GET /health`

Checks whether the backend is responding.

Example:

```http
GET /health
```

Use the interactive API documentation to inspect the exact JSON response.

### `POST /hash`

Accepts text and generates a SHA-256 digest.

Example request:

```http
POST /hash
Content-Type: application/json
```

```json
{
  "text": "hello"
}
```

The endpoint validates the input and returns the generated digest in JSON. The exact response fields can be verified in `/docs` or in the implementation.

### Input Validation

The current hash endpoint accepts non-empty text and has a maximum input length of 10,000 characters.

Invalid inputs should be rejected by the API's validation logic.

## 🧪 Testing the API

Start the backend and open:

`http://127.0.0.1:8000/docs`

Use the interactive interface to test:

- A normal text input.
- An empty string.
- Text exceeding the configured input limit.
- Unicode text.

Confirm that valid input produces a SHA-256 digest and invalid input is handled appropriately.

## 🔒 Security Considerations

- SHA-256 is a hash function, not an encryption algorithm.
- Validate all incoming data on the server.
- Do not log sensitive input unnecessarily.
- Do not expose private keys or credentials in API responses.
- Restrict CORS appropriately for production deployments.
- Use established cryptographic libraries for future RSA and ECC functionality.

## 🗺️ Planned Improvements

- RSA cryptographic operations.
- ECC cryptographic operations.
- Automated API tests.
- Production deployment configuration.

## 📌 Project Status

The backend currently provides health checks and SHA-256 hashing. RSA and ECC backend functionality will be developed in future stages.
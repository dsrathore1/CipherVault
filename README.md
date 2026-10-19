<h1 algin="center">

# ◈ CipherVault

</h1>

### A Beginner-Friendly Cryptography Learning Platform

CipherVault is a web-based learning platform designed to help beginners understand cryptography through practical tools and interactive learning experiences.

The project focuses on three core cryptographic concepts: **SHA-256 Hashing, RSA Cryptography, and Elliptic Curve Cryptography (ECC)**.

Built with Next.js and JavaScript on the frontend and Python FastAPI on the backend, CipherVault aims to make cryptography easier to explore through a clean, beginner-friendly interface.

## ✨ Features

### Implemented

- **SHA-256 Hash Generator:** Generate SHA-256 hashes from text input.
- **Input Validation:** Validate input before processing hash-generation requests.
- **Copy to Clipboard:** Copy generated hash values with visual feedback.
- **REST API:** Communicate with a Python FastAPI backend.
- **Backend Health Check:** Verify backend availability.
- **Responsive Interface:** Explore cryptography concepts through a lavender-themed user interface.
- **Client-Side Navigation:** Navigate between application pages using Next.js.

### Planned

- **RSA Cryptography:** Explore public and private keys, digital signatures, and verification.
- **Elliptic Curve Cryptography:** Learn about elliptic-curve keys, signatures, and secure key agreement.
- **Educational Modules:** Add explanations and practical examples for each cryptographic concept.

## 🛠️ Technology Stack

| Component | Technology |
|---|---|
| Frontend | Next.js, React, JavaScript |
| Styling | Tailwind CSS |
| Backend | Python, FastAPI |
| API Server | Uvicorn |
| Hashing | SHA-256 using Python `hashlib` |
| Cryptography Library | Python `cryptography` |

## 🚀 Getting Started

### Prerequisites

Install the following tools before starting:

- [Python](https://www.python.org/downloads/)
- [Node.js and npm](https://nodejs.org/)
- [Git](https://git-scm.com/)

### 1. Clone the repository

```powershell
git clone YOUR_GITHUB_REPOSITORY_URL
cd CipherVault
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with the actual URL of your GitHub repository.

### 2. Set up the backend

Open PowerShell and run:

```powershell
cd "$HOME\CipherVault\backend"
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload
```

The backend should start at:

`http://127.0.0.1:8000`

Interactive API documentation:

`http://127.0.0.1:8000/docs`

Keep the backend terminal running.

### 3. Set up the frontend

Open a second PowerShell terminal and run:

```powershell
cd "$HOME\CipherVault\frontend"
npm install
npm run dev
```

Open the application in your browser:

`http://localhost:3000`

Keep both development servers running while using the application.

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Checks backend availability |
| POST | `/hash` | Generates a SHA-256 hash from text |

### SHA-256 API Example

Request:

```http
POST /hash
Content-Type: application/json
```

```json
{
  "text": "hello"
}
```

The backend processes the input and returns the SHA-256 digest in JSON. Refer to the interactive API documentation at `/docs` for the exact response format.

## 🔐 Understanding the Cryptographic Concepts

### SHA-256 Hashing

SHA-256 is a cryptographic hash function that produces a 256-bit digest. It is useful for understanding data integrity and digital fingerprints.

### RSA Cryptography

RSA is a public-key cryptographic algorithm that can support operations such as encryption and digital signatures. Its implementation is planned for a future development stage.

### Elliptic Curve Cryptography

ECC uses elliptic-curve mathematics to support public-key cryptographic operations, including digital signatures and key agreement. Its implementation is also planned for a future development stage.

## 🔒 Security Considerations

- SHA-256 is hashing, not encryption.
- A SHA-256 digest is not intended to be reversed to recover the original input.
- Do not enter confidential information or production secrets into a learning application.
- Use established cryptographic libraries rather than implementing cryptographic algorithms from scratch.
- Validate input on the backend, even when frontend validation is present.
- Configure CORS and other security controls appropriately before deployment.

## 🎯 Project Objective

The objective of CipherVault is to build a practical, beginner-friendly environment for exploring cryptography while gaining experience in frontend development, backend APIs, and application integration.

## 📌 Project Status

CipherVault is under active development. SHA-256 hashing and its frontend integration are implemented. RSA and ECC are planned for future development.

## 📄 License

No open-source license has been selected yet. A license can be added when the project is ready for public distribution.
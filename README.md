# CipherVault 🔐

### A Full-Stack Cryptography and Observability Platform

CipherVault is a web application that brings cryptographic operations and backend observability together in a modern, responsive interface. Built with Next.js and FastAPI, the project combines SHA-256 hashing, RSA and ECC workflows, a metrics dashboard, Docker containerization, and automated CI/CD pipelines.

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-149ECA?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/FastAPI-Python-009688?logo=fastapi" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker" alt="Docker" />
  <img src="https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-2088FF?logo=githubactions" alt="GitHub Actions" />
</p>

## 🌐 Live Application

| Service | URL |
|---|---|
| Frontend | https://cipher-vault-theta.vercel.app/ |
| Backend API | https://ciphervault-backend.fastapicloud.dev/ |
| Backend health check | https://ciphervault-backend.fastapicloud.dev/health |

## ✨ Features

### Cryptography
- **SHA-256 hashing:** Generate cryptographic hashes from input data.
- **RSA:** Explore RSA cryptographic operations through a dedicated interface.
- **Elliptic Curve Cryptography (ECC):** Explore elliptic-curve operations through a dedicated interface.

### User Interface
- Next.js App Router architecture.
- Responsive application layout.
- Dedicated pages for hashing, RSA, ECC, and connection testing.
- Light and dark theme support with a theme toggle.
- Learning-content components for supplementary explanations.

### Observability
- Metrics dashboard for backend operational information.
- Prometheus-compatible metrics retrieval.
- Request counts, error counts, process information, and available latency statistics.
- Manual and automatic metrics refresh controls.
- Login, logout, and session API routes for metrics access.

### Engineering and Delivery
- FastAPI backend.
- Dockerfiles for frontend and backend.
- Docker Compose configuration.
- Backend and frontend CI workflows.
- Production Docker image publishing workflow.
- Automated linting, testing, and frontend production builds.

## 🏗️ Architecture

```text
                       User
                        |
                        v
              +--------------------+
              | Next.js Frontend   |
              | React + Tailwind   |
              +--------------------+
                        |
                        v
              +--------------------+
              | Next.js API Routes |
              | Metrics / Sessions |
              +--------------------+
                        |
                        v
              +--------------------+
              | FastAPI Backend    |
              | Cryptography APIs  |
              | Health / Metrics   |
              +--------------------+

        GitHub Repository and Actions
                        |
             +----------+----------+
             |                     |
             v                     v
         Backend CI            Frontend CI
             |                     |
             +----------+----------+
                        |
                        v
                Production CD
                        |
                        v
                  Docker Hub
```

## 🧰 Technology Stack

| Layer | Technology |
|---|---|
| Frontend framework | Next.js |
| UI library | React |
| Frontend language | JavaScript |
| Styling | Tailwind CSS |
| Backend framework | FastAPI |
| Backend language | Python |
| Testing | Pytest, HTTPX |
| Backend linting | Ruff |
| Frontend linting | ESLint |
| Containerization | Docker |
| Container orchestration for local development | Docker Compose |
| CI/CD | GitHub Actions |
| Frontend hosting | Vercel |
| Backend hosting | FastAPI Cloud |
| Container registry | Docker Hub |

## 📁 Project Structure

```text
CipherVault/
├── .github/
│   └── workflows/
│       ├── backend-ci.yml
│       ├── frontend-ci.yml
│       └── production-cd.yml
├── .vscode/
│   └── settings.json
├── backend/
│   ├── .fastapicloud/
│   ├── tests/
│   │   └── test_main.py
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── main.py
│   ├── requirements.txt
│   └── README.md
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/
│   │   │   │   ├── auth/
│   │   │   │   │   ├── login/
│   │   │   │   │   ├── logout/
│   │   │   │   │   └── session/
│   │   │   │   └── metrics/
│   │   │   ├── connection-test/
│   │   │   ├── content/
│   │   │   ├── ecc/
│   │   │   ├── hash/
│   │   │   ├── metrics/
│   │   │   ├── rsa/
│   │   │   ├── globals.css
│   │   │   ├── layout.js
│   │   │   ├── page.js
│   │   │   ├── theme-provider.js
│   │   │   └── theme-toggle.js
│   │   ├── components/
│   │   │   └── metrics-login.js
│   │   └── lib/
│   │       └── metrics-auth.js
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── eslint.config.mjs
│   ├── jsconfig.json
│   ├── next.config.mjs
│   ├── package.json
│   └── README.md
├── docker-compose.yml
└── README.md
```

## ⚙️ Prerequisites

Install the following tools:

- Git
- Python 3.11
- Node.js 22
- npm
- Docker Desktop (optional)

## 🚀 Local Installation

### 1. Clone the repository

```bash
git clone https://github.com/dsrathore1/CipherVault.git
cd CipherVault
```

### 2. Start the backend

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload
```

The backend normally starts at `http://127.0.0.1:8000`.

Check the health endpoint:

http://127.0.0.1:8000/health

### 3. Start the frontend

Open a separate terminal:

```powershell
cd frontend
npm ci
npm run dev
```

Open http://localhost:3000.

The frontend's backend URL and rewrite behavior are configured in `frontend/next.config.mjs`. Review that file when running against a local backend instead of the deployed service.

## 🧪 Quality Checks

### Backend

```powershell
cd backend
ruff check main.py tests/test_main.py
pytest tests/test_main.py -v
```

### Frontend

```powershell
cd frontend
npm run lint
npm run build
```

## 🐳 Docker

Build the backend image from the repository root:

```bash
docker build -t ciphervault-backend ./backend
```

Build the frontend image:

```bash
docker build -t ciphervault-frontend ./frontend
```

Start the services defined by the Compose file:

```bash
docker compose up --build
```

The root Compose configuration currently defines the frontend service. Review `docker-compose.yml` for its backend URL and port configuration before running the application.

## 🔄 CI/CD Pipeline

The repository contains three GitHub Actions workflows.

| Workflow | Responsibility |
|---|---|
| `backend-ci.yml` | Install backend dependencies, run Ruff, and execute tests |
| `frontend-ci.yml` | Install frontend dependencies, run ESLint, and create a production build |
| `production-cd.yml` | Publish backend and frontend Docker images following successful CI checks |

The publishing workflow uses these Docker Hub repositories:

- `prayagraj55/ciphervault-backend`
- `prayagraj55/ciphervault-frontend`

Image tags include `latest` and the corresponding commit SHA.

The workflows require correctly configured GitHub Actions permissions and Docker Hub credentials.

## 🔐 Security Considerations

- Store credentials and signing secrets in environment variables or deployment secret stores.
- Never commit `.env.local` or other files containing secrets.
- Do not expose private credentials through browser-visible environment variables.
- Review authentication and authorization on operational endpoints before public deployment.
- Use HTTPS in production.
- Do not use the application for sensitive data without independently reviewing the cryptographic implementation and deployment security.

## 🛣️ Potential Future Improvements

- Expand automated integration and end-to-end testing.
- Improve observability and operational alerting.
- Add more detailed API and architecture documentation.
- Strengthen deployment verification and security testing.
- Improve the learning experience with interactive cryptography explanations.

## 👤 Author

**DS Rathore**

GitHub: https://github.com/dsrathore1

## 📄 License

Add license information here if a license is included in the repository.

---

*CipherVault — Cryptography, observability, and automated delivery in one application.*

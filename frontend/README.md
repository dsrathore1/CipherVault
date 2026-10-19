<h1 algin="center">

# CipherVault Frontend

</h1>

The CipherVault frontend is a web application built with Next.js, React, JavaScript, and Tailwind CSS. It provides an interactive interface for exploring cryptography concepts and using the SHA-256 hash generator.

The application features a lavender and purple visual theme designed to make the learning experience clean and beginner-friendly.

## ✨ Features

- Lavender-themed landing page.
- SHA-256 hash generator interface.
- Input validation and error handling.
- Copy-to-clipboard functionality with feedback.
- Backend connection testing.
- Client-side navigation using Next.js `Link`.
- Learning cards for SHA-256, RSA, and ECC.

## 🛠️ Technology Stack

- Next.js
- React
- JavaScript
- Tailwind CSS
- Fetch API

## 🚀 Getting Started

### Prerequisites

Install Node.js and npm.

### 1. Navigate to the frontend directory

```powershell
cd "$HOME\CipherVault\frontend"
```

### 2. Install dependencies

```powershell
npm install
```

### 3. Start the development server

```powershell
npm run dev
```

Open the application:

`http://localhost:3000`

## 📄 Application Pages

| Route | Description |
|---|---|
| `/` | Main landing page |
| `/hash` | SHA-256 hash generator |
| `/connection-test` | Backend connectivity test |

## 🔌 Backend Integration

The frontend communicates with the FastAPI backend running locally at:

`http://127.0.0.1:8000`

The hash generator sends a POST request to `/hash`. The connection-test page checks the `/health` endpoint.

Ensure that the backend is running before testing these features.

## 🧪 Development Commands

```powershell
npm run dev
npm run build
npm run start
npm run lint
```

- `npm run dev` starts the development server.
- `npm run build` builds the application for production.
- `npm run start` starts the production server after a successful build.
- `npm run lint` runs the configured linting command, provided it exists in `package.json`.

## 🎨 Design Principles

- Light lavender and purple color palette.
- Rounded cards and subtle shadows.
- Clear typography and readable layouts.
- Responsive design.
- Simple navigation and beginner-friendly interactions.

## 🗺️ Planned Improvements

- RSA cryptography tools.
- ECC cryptography tools.
- More interactive explanations.
- Additional practical cryptography examples.

## 📌 Project Status

The SHA-256 interface and backend integration are implemented. RSA and ECC remain planned features.

## 🔒 Development Note

The frontend depends on the FastAPI backend for hash generation and backend connectivity checks. Do not expose private keys, credentials, or other secrets in frontend code.
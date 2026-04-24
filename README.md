# 🗳️ ElectIQ — Interactive Election Assistant

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?logo=fastapi&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-1.5_Flash-4285F4?logo=google&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?logo=docker&logoColor=white)

**ElectIQ** is a modern, non-partisan educational platform designed to gamify and simplify election literacy. With AI-driven conversational guidance, structured learning modules, and interactive quizzes, ElectIQ ensures that understanding democracy is easy, accessible, and secure.

---

## ✨ Features

- **🛡️ Secure Authentication**: Private routing and secure local session state.
- **🤖 AI Civic Assistant**: Real-time Gemini-powered assistant to answer any civic or election-related questions neutrally and concisely.
- **📚 Gamified Learning**: Pre-built educational structure with progress tracking.
- **📝 Interactive Quizzes**: Test knowledge, reinforce learning, and earn completion points.
- **🔍 Custom Civic Search**: Directly integrated Google Custom Search engine for real-time web verification.
- **🌙 Dark/Light Mode**: Full theme customization with a premium tactile UI.

---

## 🚀 Quick Start (Local Development)

The application is unified! A single command spins up both the FastAPI backend and the Vite React frontend.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Python](https://www.python.org/) (3.11+)

### 1. Clone & Install
```bash
git clone https://github.com/sparxyy/ElectIQ.git
cd ElectIQ
npm run install:all
```

### 2. Environment Variables
Create a `.env` file in the root directory and add your keys:
```env
GEMINI_API_KEY=your_gemini_api_key
GOOGLE_SEARCH_ENGINE_ID=your_cse_id
```

### 3. Run the App
```bash
npm run dev
```
- The API will run on `http://127.0.0.1:8080/api`
- The React App will run on `http://127.0.0.1:5173`

---

## ☁️ Deploying to Google Cloud Run

This project is fully containerized with a multi-stage `Dockerfile` making it trivially easy to deploy as a unified service to Google Cloud Run.

### Option A: Using Google Cloud Shell (No local install needed)
1. Open [Google Cloud Shell](https://shell.cloud.google.com/).
2. Clone your repository: `git clone https://github.com/sparxyy/ElectIQ.git`
3. Enter the directory and deploy:
```bash
cd ElectIQ
gcloud run deploy electiq-app \
  --source . \
  --port 8080 \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars="GEMINI_API_KEY=YOUR_API_KEY,GOOGLE_SEARCH_ENGINE_ID=YOUR_CSE_ID"
```

### Option B: Cloud Run from Source (via Console)
1. Go to the [Google Cloud Run Console](https://console.cloud.google.com/run).
2. Click **Create Service**.
3. Select **Continuously deploy new revisions from a source repository** and connect your GitHub repo.
4. Set the port to `8080` and add your Environment Variables.
5. Click **Deploy**.

---

## 🔐 Default Demo Account
To test the local platform without registering, use the following baked-in credentials:
- **Email:** `user1@abc.xyz`
- **Password:** `user1`

---

## 🛠️ Architecture
- **Frontend**: React.js, Tailwind CSS, Vite
- **Backend**: Python, FastAPI
- **AI Integration**: Google Generative AI (`gemini-1.5-flash`)
- **Deployment**: Docker, Google Cloud Run Compatible

# IGCSE Chemistry Exam Platform

A full-stack IGCSE Chemistry exam platform with a Node/Express backend and React frontend.

## Tech Stack
- Backend: Node.js + Express + CORS + FS
- Frontend: React + React Router

## Project Structure
- `backend/` API and data storage
- `frontend/` React UI

## Setup

### 1) Backend (runs on `http://localhost:3001`)
```bash
cd backend && npm install && npm start
```

### 2) Frontend (runs on `http://localhost:3000`)
```bash
cd frontend && npm install && npm start
```

## API Endpoints
- `GET /api/topics`
- `GET /api/questions/:topicId`
- `GET /api/stats`
- `POST /api/questions`

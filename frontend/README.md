# 🤖 Rappi Buyer Agent

AI-powered procurement decision engine for Rappi.

## 🧠 What it does
AI agent that decides APPROVE or REJECT for purchase orders based on:
- Current inventory stock
- Incoming open orders
- 7-day demand forecast
- Budget & storage capacity

## 🛠 Tech Stack
- Backend: Python, FastAPI
- Frontend: React, Vite

## ⚡ Quick Start

### Backend
cd backend
pip install fastapi uvicorn
python -m uvicorn main:app --reload

### Frontend
cd frontend
npm install
npm run dev

## 📊 Sample Decisions
| Qty | Decision | Reason |
|-----|----------|--------|
| 800 | REJECT | Exceeds budget |
| 150 | REJECT | Stock+incoming covers demand |
| 50  | ACCEPT | Safe to order |
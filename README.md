# Rappi AI Buyer Agent

An AI-powered purchasing agent that assists buyers in making purchasing decisions.

## What it does
- Takes a purchase recommendation
- Checks inventory, demand, open orders, budget, and storage
- Decides: ACCEPT, MODIFY, REJECT, or ESCALATE
- Validates the decision

## How to run
1. Install dependencies: `pip install fastapi uvicorn httpx python-dotenv`
2. Run: `python backend/agent.py`

## Test Results
- 800 units recommended → REJECT (stock already covers demand)
- 150 units recommended → REJECT (stock already covers demand)  
- 50 units recommended → REJECT (stock already covers demand)

## Tech Stack
- Python, FastAPI, JSON mock data

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from agent import run_agent
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/agent")
def agent_decision(payload: dict):
    qty = payload.get("qty", 100)
    return run_agent(qty)
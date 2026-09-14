from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_DIR = "data"

def load(filename):
    with open(os.path.join(DATA_DIR, filename)) as f:
        return json.load(f)

@app.get("/inventory")
def get_inventory():
    return load("inventory.json")

@app.get("/demand")
def get_demand():
    return load("demand.json")

@app.get("/suppliers")
def get_suppliers():
    return load("suppliers.json")

@app.get("/open-orders")
def get_open_orders():
    return load("open_orders.json")

@app.get("/budget")
def get_budget():
    return load("budget.json")
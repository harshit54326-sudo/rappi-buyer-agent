import json
import os

DATA = "data"

def load(f):
    with open(os.path.join(DATA, f)) as file:
        return json.load(file)

def run_agent(qty):
    inv = load("inventory.json")
    dem = load("demand.json")
    sup = load("suppliers.json")
    po = load("open_orders.json")
    bud = load("budget.json")

    covered = inv["current_stock"] + po["total_incoming"]
    need = dem["forecast_7_days"] - covered
    cost = qty * sup["price_per_unit"]

    if need <= 0:
        decision, approved, confidence = "REJECT", 0, 95
        reasoning = f"Stock {inv['current_stock']} + incoming {po['total_incoming']} = {covered} already covers demand {dem['forecast_7_days']}"
    elif cost > bud["available_budget"]:
        approved = int(bud["available_budget"] // sup["price_per_unit"])
        decision, confidence = "MODIFY", 80
        reasoning = f"Budget exceeded. Reduced to {approved} units"
    elif qty > bud["storage_capacity_remaining"]:
        approved = bud["storage_capacity_remaining"]
        decision, confidence = "MODIFY", 85
        reasoning = f"Storage limit. Reduced to {approved} units"
    else:
        approved, decision, confidence = qty, "ACCEPT", 90
        reasoning = "All checks passed"

    val_cost = approved * sup["price_per_unit"]
    if val_cost > bud["available_budget"] or approved > bud["storage_capacity_remaining"]:
        validated, msg, decision = False, "Validation failed", "ESCALATE"
    else:
        validated, msg = True, "Order validated successfully"

    return {
        "decision": decision,
        "recommended_qty": qty,
        "approved_qty": int(approved),
        "confidence": confidence,
        "reasoning": reasoning,
        "validation_passed": validated,
        "validation_message": msg
    }

if __name__ == "__main__":
    for qty in [800, 150, 50]:
        print(f"\n=== Testing: {qty} units ===")
        print(json.dumps(run_agent(qty), indent=2))
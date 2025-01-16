from fastapi import APIRouter

router=APIRouter(prefix="/api")

@router.get("/base-rate", status_code=200)
def get_base_rate(
    
):
    return

@router.get("/exchange-fee", status_code=200)
def get_exchange_fee():
    return
from fastapi import APIRouter, Depends, HTTPException, Query
from schema.response import CurrencySchema
from db.repository import CurrencyRepository
from schema.request import BaseRateRequest
router=APIRouter(prefix="/api")

@router.get("/base-rate", status_code=200)
def get_base_rate(
    currency_code: str = Query(...),
    currency_repo:CurrencyRepository=Depends(),
):
    currency_info=currency_repo.get_currency_by_currencycode(currency_code=currency_code)
    if not currency_code:
        raise HTTPException(status=404, detail="Currency not found")
    return CurrencySchema.model_validate(currency_info)

@router.get("/exchange-fee", status_code=200)
def get_exchange_fee():
    return
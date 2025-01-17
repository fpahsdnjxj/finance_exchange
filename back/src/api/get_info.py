from fastapi import APIRouter, Depends, HTTPException, Query
from schema.response import CurrencySchema
from db.repository import CurrencyRepository
from db.orm import Currency
from schema.request import BaseRateRequest
router=APIRouter(prefix="/api")

@router.get("/base-rate", status_code=200)
def get_base_rate(
    country_name: str = Query(...),
    currency_repo:CurrencyRepository=Depends(),
):
    currency_info=currency_repo.get_currency_by_countryname(country_name=country_name)
    if not currency_info:
        raise HTTPException(status=404, detail="Currency not found")
    return CurrencySchema.model_validate(currency_info)

@router.get("/exchange-fee", status_code=200)
def get_exchange_fee():
    return

@router.post("/base-rate", status_code=201)
def add_currency_info(
    request:BaseRateRequest,
    currency_repo:CurrencyRepository=Depends()
):
    currency:Currency=Currency.create(currency_code=request.currency_code, 
                                      country_name=request.country_name,
                                      P_per_Won=request.P_per_Won)
    currency=currency_repo.save_currency(currency=currency)
    return currency

@router.patch("/base-rate", status_code=201)
def add_currency_info(
    request:BaseRateRequest,
    currency_repo:CurrencyRepository=Depends()
):
    currency:Currency=Currency.create(currency_code=request.currency_code, 
                                      country_name=request.country_name,
                                      P_per_Won=request.P_per_Won)
    currency=currency_repo.update_currency_info(currency=currency)
    return currency
from fastapi import APIRouter, Depends, HTTPException, Query
from schema.response import CurrencySchema
from db.repository import CurrencyRepository
router=APIRouter(prefix="/api/currency")

@router.get("/base-rate", status_code=200)
async def get_base_rate(
    country_name: str = Query(...),
    currency_repo:CurrencyRepository=Depends(),
):
    currency_info=currency_repo.get_currency_by_countryname(country_name=country_name)
    if not currency_info:
        raise HTTPException(status=404, detail="Currency not found")
    return CurrencySchema.model_validate(currency_info)







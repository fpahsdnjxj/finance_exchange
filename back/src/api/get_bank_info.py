from fastapi import APIRouter, Depends, Query
from db.repository import  BankInfoRepository, CurrencyRepository
router=APIRouter(prefix="/api/bank")

@router.get("/bank-exchange-fee", status_code=200)
async def get_get_bank_exchange_fee(
    bank_name:str=Query(...),
    currency_code:str=Query(...),
    exchange_amount:float=Query(..., gt=0),
    condition_type: list[str]=Query(None, separator=","),
    bankinfo_repo:BankInfoRepository=Depends(),
    currency_repo:CurrencyRepository=Depends(),
):
    bankinfo=bankinfo_repo.get_particular_bankinfo(currency_code=currency_code, bank_name=bank_name)
    usd_price=currency_repo.get_currency_by_currencycode(currency_code='USD')
    compare_price=exchange_amount/usd_price.P_per_Won
    exchange_amount_info=[
        discount for discount in bankinfo.bank_exchange_amount_discount
        if discount.min_amount<=compare_price and discount.max_amount>=compare_price
    ]
    condition_info_list=[]
    if condition_type:
        condition_info_list=[
            condition for condition in bankinfo.bank_condition
            if condition.condition_type in condition_type
        ]
    if exchange_amount_info:
        final_preferential_rate=bankinfo.basic_preferential_rate+exchange_amount_info[0].apply_preferential_rate
    else:
        final_preferential_rate=bankinfo.basic_preferential_rate
    for condition in condition_info_list:
        final_preferential_rate+=condition.apply_preferential_rate
    
    
    final_preferential_rate=min(final_preferential_rate, bankinfo.max_preferential_rate)
    final_fee_rate=bankinfo.exchange_fee_rate*(1-final_preferential_rate)
    return  {"final_fee_rate": final_fee_rate}

@router.get("/bank-conditions", status_code=200)
async def get_bank_conditions(
    bank_name:str=Query(...),
    currency_code:str=Query(...),
    bankinfo_repo:BankInfoRepository=Depends(),
):
    bankinfo=bankinfo_repo.get_particular_bankinfo(currency_code=currency_code, bank_name=bank_name)
    conditions=[bank.condition_type for bank in bankinfo.bank_condition] if bankinfo.bank_condition else[]
    return {"conditions": conditions}
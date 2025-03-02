from fastapi import APIRouter, Depends, Query, HTTPException
from db.repository import  BankInfoRepository, CurrencyRepository, BankConditionRepository
from schema.response import BankBasicConditionSchema, BankDetailCondtionSchema
import urllib.parse

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
    bank_name=urllib.parse.unquote(bank_name)
    if condition_type:
        condition_type=[urllib.parse.unquote(item) for item in condition_type]
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
    bank_name: str = Query(..., description="Bank name is required"),
    currency_code: str = Query(..., description="Currency code is required"),
    bankinfo_repo: BankInfoRepository = Depends(),
):
    if not bank_name or not currency_code:
        raise HTTPException(status_code=400, detail="Missing required parameters: bank_name and currency_code")
    bank_name = urllib.parse.unquote(bank_name)
    bankinfo = bankinfo_repo.get_particular_bankinfo(currency_code=currency_code, bank_name=bank_name)
    
    if bankinfo is None:
        raise HTTPException(status_code=404, detail="Bank information not found")

    conditions = [bank.condition_type for bank in bankinfo.bank_condition] if bankinfo.bank_condition else []
    
    return BankBasicConditionSchema(conditions=conditions)

@router.get("/additional-conditions", status_code=200)
async def get_additional_conditions(
    default_condition:str=Query(..., description="default condition is required"),
    bankcondition_repo: BankConditionRepository =Depends(),
):
    default_condition=urllib.parse.unquote(default_condition)
    condition_list=bankcondition_repo.get_bankcondition_by_conditiontype(condition_type=default_condition)

    amountconditions=[]
    timeconditions=[]
    otherconditions=[]
    amount_set, time_set, other_set=set(), set(), set()
    
    for item in condition_list:
        if item.additional_conditions:
            if item.addtional_conditions and item.additional_conditions[0] and item.additional_conditions[0]  not in amount_set:
                amountconditions.append(item.addtional_conditions[0])
                amount_set.add(item.addtional_conditions[0])
            if len(item.additional_conditions)>1 and item.additional_conditions[1] and item.additional_conditions[1]  not in time_set: 
                timeconditions.append(item.additional_conditions[1])
                time_set.add(item.addtional_conditions[1])
            if len(item.addtional_conditions)>2 and item.additional_conditions[2] and item.additional_conditions[2]  not in other_set:
                otherconditions.append(item.addtional_conditions[2])
                other_set.add(item.addtional_conditions[2])
    
    schema=BankDetailCondtionSchema(
        amountconditions=amountconditions,
        timeconditions=timeconditions,
        otherconditions=otherconditions
    )

    return schema
                





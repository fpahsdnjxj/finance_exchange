import json
from fastapi import APIRouter, Depends, Query, HTTPException
from db.repository import  BankInfoRepository, BankConditionRepository
from schema.response import BankBasicConditionSchema, BankDetailCondtionSchema, FinalExchangeFeeSchema
import urllib.parse

router=APIRouter(prefix="/api/bank")

@router.get("/bank-exchange-fee", status_code=200)
async def get_get_bank_exchange_fee(
    bank_name:str=Query(...),
    currency_code:str=Query(...),
    condition_type: str=Query(None),
    additional_conditions:str=Query(None),
    bankinfo_repo:BankInfoRepository=Depends(),
    bankcondition_repo:BankConditionRepository=Depends(),
):
    bank_name=urllib.parse.unquote(bank_name)
    bankinfo=bankinfo_repo.get_particular_bankinfo(currency_code=currency_code, bank_name=bank_name)
    if not bankinfo:
         raise HTTPException(status_code= 404, detail="wrong bank and currency")
    final_preferential_rate=bankinfo.basic_preferential_rate
    if condition_type:
        condition_type=urllib.parse.unquote(condition_type)
        if additional_conditions:
            additional_conditions=urllib.parse.unquote(additional_conditions)
            additional_conditions=additional_conditions.split(",")
            additional_conditions=json.dumps(additional_conditions, ensure_ascii=False)
        bankcondition=bankcondition_repo.get_particular_bankcondition(condition_type=condition_type, additional_condition=additional_conditions, bankinfo_id=bankinfo.bankinfo_id)
        if bankcondition:
            final_preferential_rate=bankcondition.apply_preferential_rate
        else:
             return FinalExchangeFeeSchema(final_fee_rate=-1, apply_preferential_rate=0, exchange_fee_rate=0)

    final_fee_rate=bankinfo.exchange_fee_rate*(1-final_preferential_rate)
    return   FinalExchangeFeeSchema(final_fee_rate=final_fee_rate, apply_preferential_rate=bankcondition.apply_preferential_rate, exchange_fee_rate=bankinfo.exchange_fee_rate)

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

    conditions = list({bank.condition_type for bank in bankinfo.bank_condition}) if bankinfo.bank_condition else []
    
    return BankBasicConditionSchema(conditions=conditions, bank_detail=bankinfo.bank_detail_info)

@router.get("/additional-conditions", status_code=200)
async def get_additional_conditions(
    default_condition:str=Query(..., description="default condition is required"),
    bankcondition_repo: BankConditionRepository =Depends(),
):
    default_condition=urllib.parse.unquote(default_condition)
    condition_list=bankcondition_repo.get_bankcondition_by_conditiontype(condition_type=default_condition)
    condition_list=list(condition_list)

    amountconditions=[]
    timeconditions=[]
    otherconditions=[]
    amount_set, time_set, other_set=set(), set(), set()
    
    for item in condition_list:
        if item.additional_conditions:
            if item.additional_conditions and item.additional_conditions[0] and item.additional_conditions[0]  not in amount_set and item.additional_conditions[0]!="default":
                amountconditions.append(item.additional_conditions[0])
                amount_set.add(item.additional_conditions[0])
            if len(item.additional_conditions)>1 and item.additional_conditions[1] and item.additional_conditions[1]  not in time_set and item.additional_conditions[1]!="default": 
                timeconditions.append(item.additional_conditions[1])
                time_set.add(item.additional_conditions[1])
            if len(item.additional_conditions)>2 and item.additional_conditions[2] and item.additional_conditions[2]  not in other_set and item.additional_conditions[2]!="default":
                otherconditions.append(item.additional_conditions[2])
                other_set.add(item.additional_conditions[2])
    
    if len(condition_list)>0:
        is_time_required=condition_list[0].is_time_required
        is_amount_required=condition_list[0].is_amount_required
        is_additional_required=condition_list[0].is_additional_required

    schema=BankDetailCondtionSchema(
        amountconditions=amountconditions,
        timeconditions=timeconditions,
        otherconditions=otherconditions,
        is_time_required=is_time_required,
        is_amount_required=is_amount_required,
        is_additional_required=is_additional_required
    )

    return schema
                





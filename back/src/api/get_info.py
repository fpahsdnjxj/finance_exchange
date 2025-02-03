from fastapi import APIRouter, Depends, HTTPException, Query
from schema.response import CurrencySchema, ListCardInfoSchema, CardInfoSchema
from db.repository import CurrencyRepository, BankInfoRepository,BankConditionRepository, BankExchangeAmountDiscount, CardBenefitRepository, CardInfoRepository
router=APIRouter(prefix="/api")

@router.get("/base-rate", status_code=200)
async def get_base_rate(
    country_name: str = Query(...),
    currency_repo:CurrencyRepository=Depends(),
):
    currency_info=currency_repo.get_currency_by_countryname(country_name=country_name)
    if not currency_info:
        raise HTTPException(status=404, detail="Currency not found")
    return CurrencySchema.model_validate(currency_info)

@router.get("/bank-exchange-fee", status_code=200)
async def get_get_bank_exchange_fee(
    bank_name:str=Query(...),
    currency_code:str=Query(...),
    exchange_amount:float=Query(..., gt=0),
    condition_type: list[str]=Query(None, separator=","),
    bankinfo_repo:BankInfoRepository=Depends(),
):
    bankinfo=bankinfo_repo.get_particular_bankinfo(currency_code=currency_code, bank_name=bank_name)
    exchange_amount_info=[
        discount for discount in bankinfo.bank_exchange_amount_discount
        if discount.min_amount<=exchange_amount and discount.max_amount>=exchange_amount
    ]
    condition_info_list=[]
    if condition_type:
        condition_info_list=[
            condition for condition in bankinfo.bank_condition
            if condition.condition_type in condition_type
        ]
    final_preferential_rate=bankinfo.basic_preferential_rate+exchange_amount_info[0].apply_preferential_rate

    for condition in condition_info_list:
        final_preferential_rate+=condition.preferential_rate
    
    
    final_preferential_rate=min(final_preferential_rate, bankinfo.max_preferential_rate)
    final_fee_rate=bankinfo.exchange_fee_rate*(1-final_preferential_rate)#이거 매커니즘 잘 모르겠다.
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


@router.get("/card-benefits-list", status_code=200)
async def get_card_benefit_list(
    currency_code: str = Query(...),
    cardinfo_repo:CardInfoRepository=Depends(),
    cardbenefit_repo: CardBenefitRepository=Depends()
):
    cardinfo_list=cardinfo_repo.get_cardinfo_by_currencycode(currency_code=currency_code)
    if not cardinfo_list:
        return []
    cardinfo_ids=[item.cardinfo_id for item in cardinfo_list]
    benefits=cardbenefit_repo.get_cardbenefits_by_cardids(cardinfo_ids)
    return [benefit.benefit_type for benefit in benefits]

@router.get("/default-card-info", status_code=200)
async def get_card_info(
    currency_code: str=Query(...),
    cardinfo_repo:CardInfoRepository=Depends()
):
    cardinfo_list=cardinfo_repo.get_cardinfo_by_currencycode(currency_code=currency_code)
    if not cardinfo_list:
        return []
    cardinfo_list=[CardInfoSchema(card_name=card.card_name, 
                                  condition=card.basic_conditions, 
                                  preferential_treatment=card.exchange_discount_rate, 
                                  re_preferential_treatment=card.re_exchange_discount_rate ) for card in cardinfo_list]
    return ListCardInfoSchema(card_infos=cardinfo_list)

@router.get("/benefit-card-info")
async def get_benefit_card_list(
    currency_code: str=Query(...),
    benefit_type: list[str]=Query(..., separator=","),
    cardinfo_repo:CardInfoRepository=Depends(),
    cardbenefit_repo: CardBenefitRepository=Depends()
):
    if not benefit_type:
        raise HTTPException(status_code=422, detail="benefit_type cannot be empty")
    benefit_list=cardbenefit_repo.get_cardbenefits_by_benefittype(benefit_types=benefit_type)
    if not benefit_list:
        raise HTTPException(status=404, detail="No benefit type")
    
    cardinfo_ids=[benefit.cardinfo_id for benefit in benefit_list]
    cardinfo_list=cardinfo_repo.search_cardinfo_use_benefit(cardids=cardinfo_ids, currency_code=currency_code)
    cardinfo_list=[CardInfoSchema(card_name=card.card_name, 
                                  condition=card.basic_conditions, 
                                  preferential_treatment=card.exchange_discount_rate, 
                                  re_preferential_treatment=card.re_exchange_discount_rate ) for card in cardinfo_list]
    return ListCardInfoSchema(card_infos=cardinfo_list)


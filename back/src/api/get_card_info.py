from fastapi import APIRouter, Depends, HTTPException, Query
from schema.response import ListCardInfoSchema, CardInfoSchema
from db.repository import CardBenefitRepository, CardInfoRepository
router=APIRouter(prefix="/api/card")

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
    cardinfo_repo:CardInfoRepository=Depends(),
    cardbenefit_repo:CardBenefitRepository=Depends()
):
    cardinfo_list=cardinfo_repo.get_cardinfo_by_currencycode(currency_code=currency_code)

    cardids=[card.cardinfo_id for card in cardinfo_list]
    
    cardbenefit_list=cardbenefit_repo.get_cardbenefits_by_cardids(cardinfo_ids=cardids)
    
    cardbenefit_dict={}
    for benefit in cardbenefit_list:
        if benefit.cardinfo_id not in cardbenefit_dict:
            cardbenefit_dict[benefit.cardinfo_id] = []
        cardbenefit_dict[benefit.cardinfo_id].append(benefit.benefit_type)

    cardinfo_list=[CardInfoSchema(
                                cardinfo_id=card.cardinfo_id,
                                card_name=card.card_name, 
                                condition=card.basic_conditions, 
                                preferential_treatment=card.exchange_discount_rate, 
                                re_preferential_treatment=card.re_exchange_discount_rate,
                                benefits=cardbenefit_dict.get(card.cardinfo_id, [])
                                ) for card in cardinfo_list]
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
    
    cardbenefit_list=cardbenefit_repo.get_cardbenefits_by_cardids(cardinfo_ids=cardinfo_ids)
    
    cardbenefit_dict={}
    for benefit in cardbenefit_list:
        if benefit.cardinfo_id not in cardbenefit_dict:
            cardbenefit_dict[benefit.cardinfo_id] = []
        cardbenefit_dict[benefit.cardinfo_id].append(benefit.benefit_type)

    cardinfo_list=[CardInfoSchema( cardinfo_id=card.cardinfo_id,
                                card_name=card.card_name, 
                                  condition=card.basic_conditions, 
                                  preferential_treatment=card.exchange_discount_rate, 
                                  re_preferential_treatment=card.re_exchange_discount_rate,
                                benefits=cardbenefit_dict.get(card.cardinfo_id, [])
                                  ) for card in cardinfo_list]
    return ListCardInfoSchema(card_infos=cardinfo_list)

@router.get("/card-detail-info", status_code=200)
async def get_detail_cardbenefit(
    cardinfoid:str=Query(...),
    cardbenefit_repo:CardBenefitRepository=Depends()
):
    card_benefits=cardbenefit_repo.get_cardbenefits_by_one_cardid(cardinfo_id=cardinfoid)
    benefit_list=[benefit.benefit_detail for benefit in card_benefits]
    return {"benefit_list": benefit_list}

from db.repository import BankInfoRepository, BankConditionRepository, BankExchangeAmountDiscountRepository,  CardInfoRepository, CardBenefitRepository
from db.orm import BankInfo, BankCondition, BankExchangeAmountDiscount,CardInfo, CardBenefit
from db.connection import get_db

db_session = next(get_db()) 

def add_bankinfo():
    bank_name="NH 농협은행"
    currency_code="USD"
    exchange_fee_rate=0.02
    basic_preferential_rate=0.5
    max_preferential_rate=0.8
    
    bankinfo_repo = BankInfoRepository(session=db_session)
    bank_info=BankInfo.create(bank_name=bank_name, currency_code=currency_code, exchange_fee_rate=exchange_fee_rate, basic_preferential_rate=basic_preferential_rate, max_preferential_rate=max_preferential_rate)
    bankinfo_repo.save_bankinfo(bank_info)
    print(bank_info)
    return 

def add_bankcondition():
    bank_name="NH 농협은행"
    currency_code="USD"
    condition_type:str="최근 인터넷 환전 실적"
    condition_detail:str="최근 인터넷 환전 실적 1년 이내"
    
    bankinfo_repo = BankInfoRepository(session=db_session)
    bankinfo=bankinfo_repo.get_particular_bankinfo(currency_code=currency_code, bank_name=bank_name)
    if not bankinfo:
        raise ValueError("save bankinfo first")
    
    apply_preferential_rate:float=0.1
    bankcondition_repo=BankConditionRepository(session=db_session)
    bankcondition=BankCondition.create(bankinfo_id=bankinfo.bankinfo_id, condition_type=condition_type, condition_detail=condition_detail, apply_preferential_rate=apply_preferential_rate)
    bankcondition_repo.save_bankcondition(bankcondition)
    print(bankcondition)
    return

def add_bankexchangeamountdiscount():
    bank_name="NH 농협은행"
    currency_code="USD"
    min_amount:float=0
    max_amount:float=500

    bankinfo_repo = BankInfoRepository(session=db_session)
    bankinfo=bankinfo_repo.get_particular_bankinfo(currency_code=currency_code, bank_name=bank_name)
    if not bankinfo:
        raise ValueError("save bankinfo first")
    
    apply_preferential_rate:float=0
    bankexchangeamountdiscount_repo=BankExchangeAmountDiscountRepository(session=db_session)
    bankexchangeamountdiscount=BankExchangeAmountDiscount.create(bankinfo_id=bankinfo.bankinfo_id, 
                                                                 min_amount=min_amount, 
                                                                 max_amount=max_amount, 
                                                                 apply_preferential_rate=apply_preferential_rate)
    bankexchangeamountdiscount_repo.save_bankexchangeamountdiscount(bankexchangeamountdiscount)
    print(bankexchangeamountdiscount)
    return

def add_cardinfo():
    card_name="토스"
    currency_code="USD"
    exchange_discount_rate:float=0 
    re_exchange_discount_rate:float=0
    basic_conditions:str="""
    1. 토스 뱅크 원화 통장 보유
    (1인 당 1개만 개설 가능)
    2. 환전 금액 월 최대 30만 달러(USD) 초과 불가
    3. 외화 송금 시 1일 500만 원, 연간 2,000만 원 한도
    """
    
    cardinfo_repo = CardInfoRepository(session=db_session)
    card_info=CardInfo.create(card_name=card_name, currency_code=currency_code, exchange_discount_rate=exchange_discount_rate, re_exchange_discount_rate=re_exchange_discount_rate, basic_conditions=basic_conditions)
    cardinfo_repo.save_cardinfo(card_info)
    print(card_info)
    return


def add_cardbenefit():
    card_name="토스"
    currency_code="USD"
    benefit_type:str="캐시백"
    benefit_detail: str="해외에서 쓰는 금액의 경우 온오프라인, 가맹점 상관없이 2%를 돌려받는다."

    cardinfo_repo=CardInfoRepository(session=db_session)
    cardinfo=cardinfo_repo.get_particular_cardinfo(card_name=card_name, currency_code=currency_code)
    if not cardinfo:
        raise ValueError("save card info first")
    
    cardbenefit_repo=CardBenefitRepository(session=db_session)
    cardbenefit=CardBenefit.create(cardinfo_id=cardinfo.cardinfo_id, benefit_type= benefit_type, benefit_detail=benefit_detail)
    cardbenefit_repo.save_cardbenefit(cardbenefit)
    print(cardbenefit)
    return
    


def add_info():
    num=int(input("옵션을 고르시오\n 1. 은행정보 2. 은행조건 3. 환전 금액에 따른 조건 4. 카드 정보 5. 카드 혜택"))
    if(num==1):
        add_bankinfo()
    elif(num==2):
        add_bankcondition()
    elif(num==3):
        add_bankexchangeamountdiscount()
    elif(num==4):
        add_cardinfo()
    elif(num==5):
        add_cardbenefit()
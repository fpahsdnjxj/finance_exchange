import json
from db.repository import (
    BankInfoRepository, BankConditionRepository, BankExchangeAmountDiscountRepository, 
    CardInfoRepository, CardBenefitRepository
)
from db.orm import (
    BankInfo, BankCondition, BankExchangeAmountDiscount, 
    CardInfo, CardBenefit
)
from db.connection import get_db

db_session = next(get_db())

def load_json_file(file_path):
    """JSON 파일을 로드하는 함수"""
    with open(file_path, "r", encoding="utf-8") as file:
        return json.load(file)

def update_bankinfo(data):
    """은행 정보를 업데이트하는 함수"""
    bankinfo_repo = BankInfoRepository(session=db_session)
    
    for item in data:
        bank_info = BankInfo.create(
            bank_name=item["bank_name"], 
            currency_code=item["currency_code"], 
            exchange_fee_rate=item["exchange_fee_rate"], 
            basic_preferential_rate=item["basic_preferential_rate"]
        )
        bankinfo_repo.update_bankinfo(bankinfo=bank_info)
        print(f"Updated BankInfo: {bank_info}")

def update_bankcondition(data):
    """은행 조건을 업데이트하는 함수"""
    bankinfo_repo = BankInfoRepository(session=db_session)
    bankcondition_repo = BankConditionRepository(session=db_session)

    for item in data:
        bankinfo = bankinfo_repo.get_particular_bankinfo(
            currency_code=item["currency_code"], 
            bank_name=item["bank_name"]
        )
        if not bankinfo:
            raise ValueError("Save bankinfo first")

        bankcondition = BankCondition.create(
            bankinfo_id=bankinfo.bankinfo_id,
            condition_type=item["condition_type"], 
            condition_detail=item["condition_detail"], 
            apply_preferential_rate=item["apply_preferential_rate"],
            additional_conditions=item["additional_conditions"]
        )
        bankcondition_repo.update_bankcondition(bankcondition)
        print(f"Updated BankCondition: {bankcondition}")

def update_bankexchangeamountdiscount(data):
    """환전 금액에 따른 조건을 업데이트하는 함수"""
    bankinfo_repo = BankInfoRepository(session=db_session)
    bankexchangeamountdiscount_repo = BankExchangeAmountDiscountRepository(session=db_session)

    for item in data:
        bankinfo = bankinfo_repo.get_particular_bankinfo(
            currency_code=item["currency_code"], 
            bank_name=item["bank_name"]
        )
        if not bankinfo:
            raise ValueError("Save bankinfo first")

        bankexchangeamountdiscount = BankExchangeAmountDiscount.create(
            bankinfo_id=bankinfo.bankinfo_id, 
            min_amount=item["min_amount"], 
            max_amount=item["max_amount"], 
            apply_preferential_rate=item["apply_preferential_rate"]
        )
        bankexchangeamountdiscount_repo.update_bankexchangeamountdiscount(bankexchangeamountdiscount)
        print(f"Updated BankExchangeAmountDiscount: {bankexchangeamountdiscount}")

def update_cardinfo(data):
    """카드 정보를 업데이트하는 함수"""
    cardinfo_repo = CardInfoRepository(session=db_session)

    for item in data:
        card_info = CardInfo.create(
            card_name=item["card_name"], 
            currency_code=item["currency_code"], 
            basic_conditions=item["basic_conditions"]
        )
        cardinfo_repo.update_cardinfo(card_info)
        print(f"Updated CardInfo: {card_info}")

def update_cardbenefit(data):
    """카드 혜택을 업데이트하는 함수"""
    cardinfo_repo = CardInfoRepository(session=db_session)
    cardbenefit_repo = CardBenefitRepository(session=db_session)

    for item in data:
        cardinfo = cardinfo_repo.get_particular_cardinfo(
            card_name=item["card_name"], 
            currency_code=item["currency_code"]
        )
        if not cardinfo:
            raise ValueError("Save cardinfo first")

        cardbenefit = CardBenefit.create(
            cardinfo_id=cardinfo.cardinfo_id, 
            benefit_type=item["benefit_type"], 
            benefit_detail=item["benefit_detail"]
        )
        cardbenefit_repo.update_cardbenefit(cardbenefit)
        print(f"Updated CardBenefit: {cardbenefit}")

def process_json_data(data_type, json_data):
    """데이터 유형에 따라 적절한 업데이트 함수 호출"""
    if data_type == "1":
        update_bankinfo(json_data)
    elif data_type == "2":
        update_bankcondition(json_data)
    elif data_type == "3":
        update_bankexchangeamountdiscount(json_data)
    elif data_type == "4":
        update_cardinfo(json_data)
    elif data_type == "5":
        update_cardbenefit(json_data)
    else:
        print("잘못된 입력입니다.")

def update_info_from_json():
    data_type = input("업데이트할 데이터 종류를 입력하세요 (1: 은행정보, 2: 은행조건, 3: 환전 금액에 따른 조건, 4: 카드 정보, 5: 카드 혜택): ")
    file_path = "./update_info/input.json"

    try:
        json_data = load_json_file(file_path)
        process_json_data(data_type, json_data)
    except Exception as e:
        print(f"오류 발생: {e}")

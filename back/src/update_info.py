import requests
from dotenv import load_dotenv
from db.orm import Currency
from db.repository import CurrencyRepository
from db.connection import get_db
from datetime import datetime
import os

db_session = next(get_db()) 
currency_repo = CurrencyRepository(session=db_session)

load_dotenv()


def get_data():
    today_date = datetime.now().strftime("%Y%m%d")
    api_key=os.getenv("BANK_API_KEY")
    url=f'https://www.koreaexim.go.kr/site/program/financial/exchangeJSON'
    params = {
        "authkey": api_key,  
        "searchdate": today_date,  
        "data": "AP01",  
    }
    response = requests.get(url, params=params, timeout=10)

    if response.status_code==200:
        data = response.json()  
        for item in data:
            if "(" in item["cur_unit"]:
                base_rate = int(item["cur_unit"].split("(")[1].replace(")", ""))
            else:
                base_rate = 1
            currency_code = item["cur_unit"].split("(")[0]
            country_name = item["cur_nm"]
            deal_bas_r = float(item["deal_bas_r"].replace(",", ""))/base_rate  # 매매 기준율 (문자열 -> 실수 변환)

            # Currency 객체 생성
            currency = Currency.create(currency_code=currency_code, country_name=country_name, P_per_Won=deal_bas_r)
            currency_repo.update_currency_info(currency)
    else:
        print(f"API 요청 실패: {response.status_code}, {response.text}")


get_data()
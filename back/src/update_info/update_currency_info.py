import requests
import certifi
from dotenv import load_dotenv
from db.orm import Currency
from db.repository import CurrencyRepository
from db.connection import get_db
from datetime import datetime, timedelta
import os
from zoneinfo import ZoneInfo  


load_dotenv()

def get_currency_data():
    db_session = next(get_db()) 
    currency_repo = CurrencyRepository(session=db_session)
    now = datetime.now(ZoneInfo("Asia/Seoul"))
    api_key=os.getenv("OPEN_EXCHANGE_API_KEY")
    url=f'https://openexchangerates.org/api/latest.json'
    params = {
        "app_id": api_key
    }
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    }
    response = requests.get(url, params=params, headers=headers, timeout=30, verify=certifi.where())

    if response.status_code==200:
        data = response.json()  
        if not data:
            print(f"빈 응답 수신: {now}, API는 200 OK 응답했으나 데이터 없음")
            return
        rates=data.get("rates", {})
        standard=rates["KRW"]
        for  currency_code, exchange_rate  in rates.items():
            currency_info=currency_repo.get_currency_by_currencycode(currency_code=currency_code)
            if currency_info:
                country_name = currency_info.country_name
                deal_bas_r = standard / exchange_rate
                currency = Currency.create(currency_code=currency_code, country_name=country_name, P_per_Won=deal_bas_r)
                currency_repo.update_currency_info(currency=currency)
                print(f"통화 정보 업데이트: {currency_code}, 환율: {deal_bas_r}, 시간: {now}")

    else:
        print(f"API 요청 실패: {response.status_code}, {response.text}")



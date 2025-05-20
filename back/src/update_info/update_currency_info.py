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
    if now.hour < 11:
        target_date = (now - timedelta(days=1)).strftime("%Y%m%d")
    else:
        target_date = now.strftime("%Y%m%d")
    api_key=os.getenv("BANK_API_KEY")
    url=f'https://www.koreaexim.go.kr/site/program/financial/exchangeJSON'
    params = {
        "authkey": api_key,  
        "searchdate": target_date,  
        "data": "AP01",  
    }
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    }
    response = requests.get(url, params=params, headers=headers, timeout=30, verify="/etc/ssl/certs/ca-certificates.crt")

    if response.status_code==200:
        data = response.json()  
        if not data:
            print(f"빈 응답 수신: {target_date}, API는 200 OK 응답했으나 데이터 없음")
            return
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
        print(f"환율 정보 업데이트 완료: {target_date}")
    else:
        print(f"API 요청 실패: {response.status_code}, {response.text}")



import requests
from dotenv import load_dotenv
from db.orm import Currency
from db.repository import CurrencyRepository
from db.connection import get_db
import os

db_session = next(get_db()) 
currency_repo = CurrencyRepository(session=db_session)

load_dotenv()

api_key=os.getenv("BANK_API_KEY")
url=f'https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey={api_key}&searchdate=201801020&data=AP01'

def get_data():
    """response=requests.get(url)"""
    if True:
        mock_response=[
            {"result":1,"cur_unit":"JPY(100)","ttb":"941.53","tts":"960.56","deal_bas_r":"951.05","bkpr":"951","yy_efee_r":"0.96833","ten_dd_efee_r":"0.0242","kftc_bkpr":"951","kftc_deal_bas_r":"951.05","cur_nm":"일본 옌"},
            {"result":1,"cur_unit":"KRW","ttb":"0","tts":"0","deal_bas_r":"1","bkpr":"1","yy_efee_r":"0","ten_dd_efee_r":"0","kftc_bkpr":"1","kftc_deal_bas_r":"1","cur_nm":"한국 원"},
            {"result":1,"cur_unit":"KWD","ttb":"3,509.87","tts":"3,580.78","deal_bas_r":"3,545.33","bkpr":"3,545","yy_efee_r":"0","ten_dd_efee_r":"0","kftc_bkpr":"3,545","kftc_deal_bas_r":"3,545.33","cur_nm":"쿠웨이트 디나르"},
        ]
        """data = response.json()  # JSON 데이터를 파싱"""

        for item in mock_response:
            if len(item["cur_unit"])>3:
                base_rate=int(item["cur_unit"].split("(")[1].replace(")", ""))
            else:
                base_rate=1
            currency_code = item["cur_unit"].split("(")[0]
            country_name = item["cur_nm"]
            deal_bas_r = float(item["deal_bas_r"].replace(",", ""))/base_rate  # 매매 기준율 (문자열 -> 실수 변환)

            # Currency 객체 생성
            currency = Currency.create(currency_code=currency_code, country_name=country_name, P_per_Won=deal_bas_r)
            currency_repo.update_currency_info(currency)
    else:
        print(f"API 요청 실패: {response.status_code}, {response.text}")

get_data()
from update_info.update_currency_info import get_currency_data
from update_info.add_info import add_info

num1=int(input("옵션을 고르시오 1. 환율 API 업데이트 2. 그외"))
num2=int(input("목적을 고르시오 1. 정보 수정 2. 정보 추가"))

"""
if(num1==1):
    get_currency_data()
elif(num1==2):
    if(num2==2):
        add_info()
"""

add_info()



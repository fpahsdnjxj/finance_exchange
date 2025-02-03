from typing import List
from pydantic import BaseModel

class BaseRateRequest(BaseModel):
    currency_code: str
    country_name:str
    P_per_Won:float

class ExchangeInfoRequest(BaseModel):
    bank:str
    currency: str
    benefit:str

class BankInfoDetailRequest(BaseModel):
    bank_name: str
    country_name:str

class BankExchangeRequest(BaseModel):
    bank_name:str
    country_name:str
    exchange_amount: float
    conditions: List[str]

class CardInfoRequest(BaseModel):
    country_name:str
    exchange_amount:float
    conditions:List[str]

from pydantic import BaseModel

class BaseRateRequest(BaseModel):
    currency_code: str
    country_name:str
    P_per_Won:float

class ExchangeInfoRequest(BaseModel):
    bank:str
    currency: str
    benefit:str


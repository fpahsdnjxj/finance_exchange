from pydantic import BaseModel

class BaseRateRequest(BaseModel):
    currency_code: str

class ExchangeInfoRequest(BaseModel):
    bank:str
    currency: str
    benefit:str


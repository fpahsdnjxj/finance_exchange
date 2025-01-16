from pydantic import BaseModel

class BaseRateRequest(BaseModel):
    country: str

class ExchangeInfoRequest(BaseModel):
    bank:str
    currency: str
    benefit:str
from typing import List
from pydantic import BaseModel

class CurrencySchema(BaseModel):
    P_per_Won: float
    class Config:
        from_attributes=True

class BankDetailSchema(BaseModel):
    conditions: List[str]

class BankExchangeSchema(BaseModel):
    preferential_treatment: float
    final_exchange_rate: float

class CardDetailSchema(BaseModel):
    conditions: List[str]

class CardInfoSchema(BaseModel):
    card_name:str
    condition:str
    preferential_treatment: float
    re_preferential_treatment: float

class ListCardInfoSchema(BaseModel):
    card_infos:List[CardInfoSchema]
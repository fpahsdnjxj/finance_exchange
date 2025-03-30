from typing import List, Optional
from pydantic import BaseModel

class CurrencySchema(BaseModel):
    P_per_Won: float
    class Config:
        from_attributes=True

class BankBasicConditionSchema(BaseModel):
    conditions: List[str]
    bank_detail: List[str]
    class Config:
        from_attributes=True

class BankDetailCondtionSchema(BaseModel):
    amountconditions: Optional[List[str]]=[]
    timeconditions: Optional[List[str]]=[]
    otherconditions: Optional[List[str]]=[]
    is_amount_required: bool
    is_time_required: bool
    is_additional_required: bool
    class Config:
        from_attributes=True


class BankExchangeSchema(BaseModel):
    preferential_treatment: float
    final_exchange_rate: float

class CardDetailSchema(BaseModel):
    conditions: List[str]

class CardInfoSchema(BaseModel):
    cardinfo_id:str
    card_name:str
    condition:str
    benefits:List[str]
    benefit_detail:List[str]

class ListCardInfoSchema(BaseModel):
    card_infos:List[CardInfoSchema]

class FinalExchangeFeeSchema(BaseModel):
    final_fee_rate: float
    apply_preferential_rate: float
    exchange_fee_rate: float

    class Config:
        from_attributes=True
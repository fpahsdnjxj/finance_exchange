from pydantic import BaseModel

class CurrencySchema(BaseModel):
    P_per_Won: float
    class Config:
        from_attributes=True
from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.orm import Session
from db.connection import get_db
from db.orm import Currency

class CurrencyRepository:
    def __init__(self, session:Session=Depends(get_db)):
        self.session=session
    
    def get_currency_by_currencycode(self, currency_code:str)->Currency|None:
        return self.session.scalar(select(Currency).where(Currency.currency_code==currency_code))
    
    def save_currency(self, currency: Currency)->Currency:
        self.session.add(instance=currency)
        self.session.commit()
        self.session.refresh(instance=currency)
        return currency
    
   
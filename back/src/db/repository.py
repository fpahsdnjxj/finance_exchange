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
    
    def get_currency_by_countryname(self, country_name:str)->Currency|None:
        return self.session.scalar(select(Currency).where(Currency.country_name==country_name))
    
    def save_currency(self, currency: Currency)->Currency:
        self.session.add(instance=currency)
        self.session.commit()
        self.session.refresh(instance=currency)
        return currency
    
    def update_currency_info(self, currency:Currency)->Currency:
        existing_currency = self.get_currency_by_currencycode(currency.currency_code)
        if not existing_currency:
            raise ValueError(f"Currency with code {currency.currency_code} does not exist.")
        
        for field, value in currency.__dict__.items():
            if field != "_sa_instance_state":  
                setattr(existing_currency, field, value)
        
        self.session.commit()
        self.session.refresh(existing_currency)
        return existing_currency
    
   
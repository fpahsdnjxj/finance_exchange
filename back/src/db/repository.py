from fastapi import Depends
from sqlalchemy import select, and_
from sqlalchemy.orm import Session
from db.connection import get_db
from db.orm import BankCondition, BankExchangeAmountDiscount, BankInfo, CardBenefit, CardInfo, Currency

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
    
    def update_currency_info(self, currency: Currency) -> Currency:
        existing_currency = self.get_currency_by_currencycode(currency.currency_code)
        if not existing_currency:
            raise ValueError(f"Currency with code {currency.currency_code} does not exist.")


        for field, value in vars(currency).items():
            if field in ["P_per_Won"]:  
                setattr(existing_currency, field, value)
        
        self.session.commit()
        self.session.refresh(existing_currency)
        return existing_currency


class BankInfoRepository:
    def __init__(self, session:Session=Depends(get_db)):
        self.session=session
    
    def get_bankinfo_by_currencycode(self, currency_code:str)->BankInfo|None:
        return self.session.scalar(select(BankInfo).where(BankInfo.currency_code==currency_code))
    
    def get_particular_bankinfo(self, currency_code:str, bank_name:str)->BankInfo|None:
        return self.session.scalar(select(BankInfo).where(and_(BankInfo.currency_code==currency_code, BankInfo.bank_name==bank_name)))
    
    def save_bankinfo(self, bankinfo:BankInfo)->BankInfo:
        self.session.add(instance=bankinfo)
        self.session.commit()
        self.session.refresh(instance=bankinfo)
        return bankinfo
    
    def update_bankinfo(self, bankinfo: BankInfo)->BankInfo:
        existing_bankinfo=self.get_particular_bankinfo(currency_code=bankinfo.currency_code, bank_name=bankinfo.bank_name)
        if not existing_bankinfo:
            raise ValueError("No information for that bank. please save first")
        

        for field, value in vars(bankinfo).items():
            if field in ["basic_preferential_rate", "max_preferential_rate"] and value is not None:
                setattr(existing_bankinfo, field, value)
        
        self.session.commit()
        self.session.refresh(existing_bankinfo)
        return existing_bankinfo

class BankConditionRepository:
    def __init__(self, session:Session=Depends(get_db)):
        self.session=session
    
    def get_bankcondition_by_bankid(self, bankinfo_id:str)->BankCondition|None:
        return self.session.scalar(select(BankCondition).where(BankCondition.bankinfo_id==bankinfo_id))

    def get_particular_bankcondition(self, bankinfo_id:str,condition_type:str )->BankCondition|None:
       return self.session.scalar(select(BankCondition).where(and_(BankCondition.bankinfo_id==bankinfo_id, BankCondition.condition_type==condition_type)))

    def save_bankcondition(self, bankcondition:BankCondition)->BankCondition:
        self.session.add(instance=bankcondition)
        self.session.commit()
        self.session.refresh(instance=bankcondition)
        return bankcondition

    def update_bankcondition(self, bankcondition:BankCondition):
        existing_bankcondition=self.get_particular_bankcondition(bankinfo_id=bankcondition.bankinfo_id, condition_type=bankcondition.condition_type)
        if not existing_bankcondition:
            raise ValueError("No information for that bank condition. please save first")
        
        for field, value in vars(bankcondition).items():
            if field in ["condition_type", "condition_detail", "apply_preferential_rate"] and value is not None:
                setattr(existing_bankcondition, field, value)
        
        self.session.commit()
        self.session.refresh(existing_bankcondition)
        return existing_bankcondition

    

class BankExchangeAmountDiscountRepository:
    def __init__(self, session:Session=Depends(get_db)):
        self.session=session
    
    def get_bankexchangeamountdiscount_by_bankid(self, bankinfo_id:str)->BankExchangeAmountDiscount|None:
        return self.session.scalar(select(BankExchangeAmountDiscount).where(BankExchangeAmountDiscount.bankinfo_id==bankinfo_id))

    def get_particular_bankexchangeamountdiscount(self, bankinfo_id:str, min_amount:float)->BankExchangeAmountDiscount|None:
       return self.session.scalar(select(BankExchangeAmountDiscount).where(and_(BankExchangeAmountDiscount.bankinfo_id==bankinfo_id, BankExchangeAmountDiscount.min_amount==min_amount)))

    def save_bankexchangeamountdiscount(self, bankexchangeamountdiscount:BankExchangeAmountDiscount)->BankExchangeAmountDiscount:
        self.session.add(instance=bankexchangeamountdiscount)
        self.session.commit()
        self.session.refresh(instance=bankexchangeamountdiscount)
        return bankexchangeamountdiscount

    def update_bankexchangeamountdiscount(self,bankexchangeamountdiscount:BankExchangeAmountDiscount)->BankExchangeAmountDiscount:
        existing_bankexchangeamountdiscount=self.get_particular_bankexchangeamountdiscount(bankinfo_id=bankexchangeamountdiscount.bankinfo_id, min_amount=bankexchangeamountdiscount.min_amount)
        if not existing_bankexchangeamountdiscount:
            raise ValueError("No information for that bank exchange amount. please save first")
        
        for field, value in vars(bankexchangeamountdiscount).items():
            if field in ["min_amount", "max_amount", "apply_preferential_rate"] and value is not None:
                setattr(existing_bankexchangeamountdiscount, field, value)
        
        self.session.commit()
        self.session.refresh(existing_bankexchangeamountdiscount)
        return existing_bankexchangeamountdiscount
    
class CardInfoRepository:
    def __init__(self, session:Session=Depends(get_db)):
        self.session=session

    def get_cardinfo_by_currencycode(self, currency_code:str)->CardInfo|None:
        return self.session.scalar(select(CardInfo).where(CardInfo.currency_code==currency_code))
    
    def get_particular_cardinfo(self, currency_code:str, card_name:str)->CardInfo|None:
        return self.session.scalar(select(CardInfo).where(and_(CardInfo.currency_code==currency_code, CardInfo.card_name==card_name)))
    
    def save_cardinfo(self, cardinfo:CardInfo)->CardInfo:
        self.session.add(instance=cardinfo)
        self.session.commit()
        self.session.refresh(instance=cardinfo)
        return cardinfo
    
    def update_cardinfo(self, cardinfo: CardInfo)->CardInfo:
        existing_cardinfo=self.get_particular_cardinfo(currency_code=cardinfo.currency_code, card_name=cardinfo.card_name)
        if not existing_cardinfo:
            raise ValueError("No information for that card. please save first")
        

        for field, value in vars(cardinfo).items():
            if field in ["exchange_discount_rate", "re_exchange_discount_rate", "basic_conditions"] and value is not None:
                setattr(existing_cardinfo, field, value)
        
        self.session.commit()
        self.session.refresh(existing_cardinfo)
        return existing_cardinfo
    

class CardBenefitRepository:
    def __init__(self, session:Session=Depends(get_db)):
        self.session=session
    
    def get_cardbenefit_by_cardid(self, cardinfo_id:str)->CardBenefit|None:
        return self.session.scalar(select(CardBenefit).where(CardBenefit.cardinfo_id==cardinfo_id))

    def get_particular_cardbenefit(self, cardinfo_id:str,benefit_type:str )->CardBenefit|None:
       return self.session.scalar(select(CardBenefit).where(and_(CardBenefit.cardinfo_id==cardinfo_id, CardBenefit.benefit_type==benefit_type)))
    
    def save_cardbenefit(self, cardbenefit:CardBenefit)->CardBenefit:
        self.session.add(instance=cardbenefit)
        self.session.commit()
        self.session.refresh(instance=cardbenefit)
        return cardbenefit
    
    def update_cardbenefit(self, cardbenefit:CardBenefit)->CardBenefit:
        existing_cardbenefit=self.get_particular_cardbenefit(cardinfo_id=cardbenefit.cardinfo_id, benefit_type=cardbenefit.benefit_type)
        if not existing_cardbenefit:
            raise ValueError("No information for that card benefit. please save first")
        
        for field, value in vars(cardbenefit).items():
            if field in ["benefit_type", "benefit_detail"] and value is not None:
                setattr(existing_cardbenefit, field, value)
        
        self.session.commit()
        self.session.refresh(existing_cardbenefit)
        return existing_cardbenefit
    
    

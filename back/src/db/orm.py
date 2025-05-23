import json
from typing import List
from sqlalchemy import Column, CHAR, VARCHAR, DateTime, Double, Text, ForeignKey, func, JSON, Boolean, Integer
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime, timezone
import uuid

Base=declarative_base()

class Currency(Base):
    __tablename__="Currency"

    currency_code=Column(CHAR(3), primary_key=True, index=True)
    country_name=Column(VARCHAR(50), nullable=False)
    P_per_Won=Column(Double, nullable=False)
    update_date=Column(DateTime, nullable=False, default=func.now(), onupdate=func.now())

    def __repr__(self):
        return f"Currency(currency_code={self.currency_code}, country_name={self.country_name}, update_time={self.update_date}, price_per_won={self.P_per_Won})"
    
    @classmethod
    def create(cls, currency_code: str, country_name: str, P_per_Won: float):
        return cls(
            currency_code=currency_code,
            country_name=country_name,
            P_per_Won=P_per_Won,
        )

class BankInfo(Base):
    __tablename__="BankInfo"
    bankinfo_id=Column(CHAR(36), primary_key=True, index=True, default=lambda:(uuid.uuid4()))
    bank_name=Column(VARCHAR(100), nullable=False)
    currency_code=Column(CHAR(3), nullable=False)
    exchange_fee_rate=Column(Double, nullable=False)
    basic_preferential_rate=Column(Double, nullable=False)
    bank_detail_info=Column(JSON, nullable=True, default=list)
    update_date=Column(DateTime, nullable=False, default=func.now(), onupdate=func.now())

    bank_condition=relationship("BankCondition", backref="bank")
    bank_exchange_amount_discount=relationship("BankExchangeAmountDiscount", backref="bank")

    def __repr__(self):
        return( f"BankInfo("
        f"bankinfo_id={self.bankinfo_id}, " 
        f"bank_name={self.bank_name}, " 
        f"currency_code={self.currency_code}, "
        f"basic_preferential_rate={self.basic_preferential_rate}, "
        f"update_date={self.update_date})"
        )
    
    @classmethod
    def create(cls, bank_name:str,
                currency_code:str, 
                exchange_fee_rate:float,
                basic_preferential_rate: float):
        return cls(
            bank_name=bank_name,
            currency_code=currency_code,
            exchange_fee_rate=exchange_fee_rate,
            basic_preferential_rate=basic_preferential_rate
        )

class BankCondition(Base):  # 환전 금액당 우대율 제외 저장할 table
    __tablename__ = "BankCondition"
    
    condition_id = Column(CHAR(36), primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    bankinfo_id = Column(CHAR(36), ForeignKey("BankInfo.bankinfo_id"))
    condition_type = Column(VARCHAR(200))
    condition_detail = Column(Text)
    apply_preferential_rate = Column(Double, nullable=False)
    update_date = Column(DateTime, nullable=False, default=func.now(), onupdate=func.now())
    additional_conditions = Column(JSON, nullable=True)
    is_amount_required = Column(Boolean, nullable=False, default=False)
    is_time_required = Column(Boolean, nullable=False, default=False)
    is_additional_required = Column(Boolean, nullable=False, default=False)
    
    # ✅ 추가된 부분
    is_recommended = Column(Integer, nullable=False, default=0)

    def __repr__(self):
        return (f"BankCondition("
                f"condition_id={self.condition_id}, "
                f"bankinfo_id={self.bankinfo_id}, "
                f"condition_type={self.condition_type}, "
                f"additional_conditions={self.additional_conditions}, "
                f"condition_detail={self.condition_detail}, "
                f"apply_preferential_rate={self.apply_preferential_rate}, "
                f"update_date={self.update_date}, "
                f"is_recommended={self.is_recommended})")

    @classmethod
    def create(cls, bankinfo_id: str,
               condition_type: str,
               condition_detail: str,
               additional_conditions: List[str],
               apply_preferential_rate: float):
        return cls(
            bankinfo_id=bankinfo_id,
            condition_type=condition_type,
            additional_conditions=additional_conditions,
            condition_detail=condition_detail,
            apply_preferential_rate=apply_preferential_rate
        )

class BankExchangeAmountDiscount(Base):#환전 금액 당 수수료가 깎이는 애들에 대해서 저장할 것임
    __tablename__="BankExchangeAmountDiscount"
    exchangeinfo_id=Column(CHAR(36), primary_key=True, index=True, default=lambda:(uuid.uuid4()))
    bankinfo_id=Column(CHAR(36), ForeignKey("BankInfo.bankinfo_id"))
    min_amount=Column(Double, nullable=False)
    max_amount=Column(Double, nullable=True)
    apply_preferential_rate=Column(Double, nullable=False)
    update_date=Column(DateTime, nullable=False, default=func.now(), onupdate=func.now())


    def __repr__(self):
        return (f"BankExchangeAmountDiscount("
            f"exchangeinfo_id={self.exchangeinfo_id}, "
            f"bankinfo_id={self.bankinfo_id}, "
            f"min_amount={self.min_amount}, "
            f"max_amount={self.max_amount}, "
            f"apply_preferential_rate={self.apply_preferential_rate}, "
            f"update_date={self.update_date})")
    
    @classmethod
    def create(cls, bankinfo_id:str,
               min_amount:float,
               max_amount:float,
               apply_preferential_rate:float):
        return cls(
            bankinfo_id=bankinfo_id,
            min_amount=min_amount,
            max_amount=max_amount,
            apply_preferential_rate=apply_preferential_rate
        )


class CardInfo(Base):
    __tablename__="CardInfo"
    cardinfo_id=Column(CHAR(36), primary_key=True, index=True, default=lambda:(uuid.uuid4()))
    card_name=Column(VARCHAR(200), nullable=False)
    currency_code=Column(CHAR(3), nullable=False)
    basic_conditions=Column(Text)
    update_date=Column(DateTime, nullable=False, default=func.now(), onupdate=func.now())

    card_benefit=relationship("CardBenefit", backref="card")
    
    def __repr__(self):
        return (f"CardInfo("
        f"cardinfo_id={self.cardinfo_id}, "
        f"card_name={self.card_name}, "
        f"currency_code={self.currency_code}, "
        f"basic_conditions={self.basic_conditions}, "
        f"update_date={self.update_date})")
    
    @classmethod
    def create(cls, card_name:str, 
               currency_code:str, 
               basic_conditions:str):
        return cls(
            card_name=card_name,
            currency_code=currency_code,
            basic_conditions=basic_conditions
        )

class CardBenefit(Base):#카드 해택에 대한 것
    __tablename__="CardBenefit"
    benefit_id=Column(CHAR(36), primary_key=True, index=True, default=lambda:(uuid.uuid4()))
    cardinfo_id=Column(CHAR(36), ForeignKey("CardInfo.cardinfo_id"))
    benefit_type=Column(VARCHAR(200), nullable=False)
    benefit_detail=Column(Text, nullable=False)
    update_date=Column(DateTime, nullable=False, default=func.now(), onupdate=func.now())

    def __repr__(self):
        return (f"CardBenefit("
        f"benefit_id={self.benefit_id}, "
        f"cardinfo_id={self.cardinfo_id}, "
        f"benefit_type={self.benefit_type}, "
        f"benefit_detail={self.benefit_detail}, "
        f"update_date={self.update_date})")

    @classmethod
    def create(cls, cardinfo_id:str,
               benefit_type:str,
               benefit_detail: str
               ):
        return cls(
            cardinfo_id=cardinfo_id,
            benefit_type=benefit_type,
            benefit_detail=benefit_detail
        )








    





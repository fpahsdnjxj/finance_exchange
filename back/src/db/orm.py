from sqlalchemy import Column, CHAR, VARCHAR, DateTime, Double, Text, ForeignKey
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime, timezone
import uuid

Base=declarative_base()

class Currency(Base):
    __tablename__="Currency"

    currency_code=Column(CHAR(3), primary_key=True, index=True)
    country_name=Column(VARCHAR(50), nullable=False)
    P_per_Won=Column(Double, nullable=False)
    update_date=Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc),  onupdate=lambda: datetime.now(timezone.utc))

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
    max_preferential_rate=Column(Double, nullable=False)
    update_date=Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc),  onupdate=lambda: datetime.now(timezone.utc))

    bank_condition=relationship("BankCondition", backref="bank")
    bank_exchange_amount_discount=relationship("BankExchangeAmountDiscount", backref="bank")

    def __repr__(self):
        return( f"BankInfo("
        f"bankinfo_id={self.bankinfo_id}, " 
        f"bank_name={self.bank_name}, " 
        f"currency_code={self.currency_code}, "
        f"basic_preferential_rate={self.basic_preferential_rate}, "
        f"max_preferential_rate={self.max_preferential_rate}, "
        f"update_date={self.update_date})"
        )
    
    @classmethod
    def create(cls, bank_name:str,
                currency_code:str, 
                basic_preferential_rate: float, 
                max_preferential_rate:float):
        return cls(
            bank_name=bank_name,
            currency_code=currency_code,
            basic_preferential_rate=basic_preferential_rate,
            max_preferential_rate=max_preferential_rate
        )

class BankCondition(Base): #환전 금액당 우대율 제외 저장할 table 
    __tablename__="BankCondition"
    condition_id=Column(CHAR(36), primary_key=True, index=True, default=lambda:(uuid.uuid4()))
    bankinfo_id=Column(CHAR(36), ForeignKey("BankInfo.bankinfo_id"))
    condition_type=Column(VARCHAR(200))
    condition_detail=Column(Text)
    apply_preferential_rate=Column(Double, nullable=False)
    update_date=Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc),  onupdate=lambda: datetime.now(timezone.utc))

    def __repr__(self):
        return(f"BankCondition("
        f"condition_id={self.condition_id}, "
        f"bankinfo_id={self.bankinfo_id}, "
        f"condition_type={self.condition_type}, "
        f"condition_detail={self.condition_detail}, "
        f"apply_preferential_rate={self.apply_preferential_rate}, "
        f"update_date={self.update_date}) "
        )

    @classmethod
    def create(cls,bankinfo_id:str, 
               condition_type:str,
               condition_detail:str,
               apply_preferential_rate:float):
        return cls(
            bankinfo_id=bankinfo_id,
            condition_type=condition_type,
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
    update_date=Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc),  onupdate=lambda: datetime.now(timezone.utc))

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
    exchange_discount_rate=Column(Double, nullable=False)
    re_exchange_discount_rate=Column(Double)
    basic_conditions=Column(Text)
    update_date=Column(DateTime, nullable=False, default=lambda:datetime.now(timezone.utc))

    card_benefit=relationship("CardBenefit", backref="card")
    card_exchange_amount_discount=relationship("CardExchangeAmountDiscount", backref="card")
    
    def __repr__(self):
        return (f"CardInfo("
        f"cardinfo_id={self.cardinfo_id}, "
        f"card_name={self.card_name}, "
        f"currency_code={self.currency_code}, "
        f"exchange_discount_rate={self.exchange_discount_rate}, "
        f"re_exchange_discount_rate={self.re_exchange_discount_rate}, "
        f"basic_conditions={self.basic_conditions}, "
        f"update_date={self.update_date})")
    
    @classmethod
    def create(cls, card_name:str, 
               currency_code:str, 
               exchange_discount_rate:float, 
               re_exchange_discount_rate:float, 
               basic_conditions:str):
        return cls(
            card_name=card_name,
            currency_code=currency_code,
            exchange_discount_rate=exchange_discount_rate,
            re_exchange_discount_rate=re_exchange_discount_rate,
            basic_conditions=basic_conditions
        )

class CardBenefit(Base):#카드 해택에 대한 것
    __tablename__="CardBenefit"
    benefit_id=Column(CHAR(36), primary_key=True, index=True, default=lambda:(uuid.uuid4()))
    cardinfo_id=Column(CHAR(36), ForeignKey("CardInfo.cardinfo_id"))
    benefit_type=Column(VARCHAR(200), nullable=False)
    benefit_detail=Column(Text, nullable=False)
    update_date=Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))

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


class CardExchangeAmountDiscount(Base):#환전 금액 당 수수료가 깎이는 애들에 대해서 저장할 것임
    __tablename__="CardExchangeAmountDiscount"
    exchangeinfo_id=Column(CHAR(36), primary_key=True, index=True, default=lambda:(uuid.uuid4()))
    cardinfo_id=Column(CHAR(36), ForeignKey("CardInfo.cardinfo_id"))
    min_amount=Column(Double, nullable=False)
    max_amount=Column(Double, nullable=True)
    apply_preferential_rate=Column(Double, nullable=False)
    update_date=Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc),  onupdate=lambda: datetime.now(timezone.utc))

    def __repr__(self):
        return (f"CardExchangeAmountDiscount("
            f"exchangeinfo_id={self.exchangeinfo_id}, "
            f"cardinfo_id={self.cardinfo_id}, "
            f"min_amount={self.min_amount}, "
            f"max_amount={self.max_amount}, "
            f"apply_preferential_rate={self.apply_preferential_rate}, "
            f"update_date={self.update_date})")
    
    @classmethod
    def create(cls, cardinfo_id:str,
               min_amount:float,
               max_amount:float,
               apply_preferential_rate:float):
        return cls(
            cardinfo_id=cardinfo_id,
            min_amount=min_amount,
            max_amount=max_amount,
            apply_preferential_rate=apply_preferential_rate
        )





    





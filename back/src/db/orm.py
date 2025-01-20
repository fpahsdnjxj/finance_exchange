from sqlalchemy import Column, CHAR, VARCHAR, DateTime, Double
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime, timezone

Base=declarative_base()

class Currency(Base):
    __tablename__="Currency"

    currency_code=Column(CHAR(3), primary_key=True, index=True)
    country_name=Column(VARCHAR(50), nullable=False)
    update_date=Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc),  onupdate=lambda: datetime.now(timezone.utc))
    P_per_Won=Column(Double, nullable=False)

    def __repr__(self):
        return f"Currency(currency_code={self.currency_code}, country_name={self.country_name}, update_time={self.update_date}, price_per_won={self.P_per_Won})"
    
    @classmethod
    def create(cls, currency_code: str, country_name: str, P_per_Won: float):
        return cls(
            currency_code=currency_code,
            country_name=country_name,
            P_per_Won=P_per_Won,
        )


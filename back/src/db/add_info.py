from db.connection import get_db
from db.orm import Currency
from repository import CurrencyRepository

    
def add_currency_info(
    currency_code: str, country_name: str, P_per_Won: float,
    currency_repo:CurrencyRepository
):
    currency:Currency=Currency.create(currency_code=currency_code, 
                                      country_name=country_name,
                                      P_per_Won=P_per_Won)
    currency=currency_repo.save_currency(currency=currency)
    return currency

def update_currency_info(
    currency_code: str, country_name: str, P_per_Won: float,
    currency_repo:CurrencyRepository
):
    currency:Currency=Currency.create(currency_code=currency_code, 
                                      country_name=country_name,
                                      P_per_Won=P_per_Won)
    currency=currency_repo.update_currency_info(currency=currency)
    return currency

db_session = next(get_db())  # get_db()는 제너레이터라서 next()로 호출해야 함
currency_repo = CurrencyRepository(session=db_session)





from dotenv import load_dotenv
from orm import BankInfo, BankCondition, BankExchangeAmountDiscount
from db.repository import BankInfoRepository, BankConditionRepository, BankExchangeAmountDiscount
from db.connection import get_db
from datetime import datetime
import os

db_session = next(get_db()) 





import pandas as pd
from db.repository import (
    BankConditionRepository
)
from db.orm import (
 BankCondition
)

from db.connection import get_db


def add_by_csv():
    db_session = next(get_db())
    df=pd.read_csv(r"C:\Users\fpqhs\code\project\financeit_crue\BankCondition0318.csv", encoding="utf-8")
    data=df.to_dict(orient="records")
    bankcondition_repo = BankConditionRepository(session=db_session)
    for item in data:
        bankcondition = BankCondition.create(
                bankinfo_id=item["bankinfo_id"],
                condition_type=item["condition_type"], 
                condition_detail=item["condition_detail"], 
                apply_preferential_rate=item["apply_preferential_rate"],
                additional_conditions=item["additional_conditions"]
            )
        bankcondition_repo.save_bankcondition(bankcondition)
        print(f"Added BankCondition: {bankcondition}")
    db_session.close()
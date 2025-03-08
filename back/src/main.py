from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import get_currency_info, get_bank_info, get_card_info

app=FastAPI()
app.include_router(get_currency_info.router)
app.include_router(get_bank_info.router)
app.include_router(get_card_info.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)



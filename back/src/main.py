from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.get_currency_info import router as currency_router
from api.get_bank_info import router as bank_router
from api.get_card_info import router as card_router

app = FastAPI()

app.include_router(currency_router)
app.include_router(bank_router)
app.include_router(card_router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:80"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)



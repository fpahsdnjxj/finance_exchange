from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.get_currency_info import router as currency_router
from api.get_bank_info import router as bank_router
from api.get_card_info import router as card_router
import uvicorn 

app = FastAPI()

app.include_router(currency_router)
app.include_router(bank_router)
app.include_router(card_router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:80",
                   "http://localhost:3000",
                   "https://goldtech-crue.p-e.kr"
                   ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) 


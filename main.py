import asyncio
import os
import logging
from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command
from aiogram.types import WebAppInfo, InlineKeyboardMarkup, InlineKeyboardButton
from dotenv import load_dotenv

# Load surroundings
load_dotenv()

# Token va URL larni olish
# Siz bergan token: 8622573055:AAFHX-rTKHAmx50o_m0psqSzM9DED1UmvGk
API_TOKEN = os.getenv("BOT_TOKEN") or "8622573055:AAFHX-rTKHAmx50o_m0psqSzM9DED1UmvGk"
WEB_APP_URL = os.getenv("APP_URL")

# Setup logging
logging.basicConfig(level=logging.INFO)

# Initialize bot and dispatcher
bot = Bot(token=API_TOKEN)
dp = Dispatcher()

@dp.message(Command("start"))
async def cmd_start(message: types.Message):
    # Web App tugmasini yaratish
    # WEB_APP_URL - bu bizning React ilovamiz joylashgan manzil
    keyboard = InlineKeyboardMarkup(inline_keyboard=[
        [
            InlineKeyboardButton(
                text="📊 Moliya Nazoratini Ochish", 
                web_app=WebAppInfo(url=WEB_APP_URL)
            )
        ]
    ])
    
    welcome_text = (
        f"Assalomu alaykum, {message.from_user.full_name}!\n\n"
        "Moliya Nazorati botiga xush kelibsiz. "
        "Pastdagi tugmani bosish orqali barcha hisob-kitoblarni qulay interfeysda boshqarishingiz mumkin."
    )
    
    await message.answer(welcome_text, reply_markup=keyboard)

async def main():
    print(f"Bot ishga tushdi...")
    print(f"Web App URL: {WEB_APP_URL}")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())

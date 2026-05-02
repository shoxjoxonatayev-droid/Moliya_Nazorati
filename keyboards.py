from aiogram.types import ReplyKeyboardMarkup, KeyboardButton, InlineKeyboardMarkup, InlineKeyboardButton

def main_menu():
    kb = [
        [KeyboardButton(text="🍽 RESTORAN"), KeyboardButton(text="🏨 GOSTINNITSA")],
        [KeyboardButton(text="👤 SHAXSIY XARAJATLAR")],
        [KeyboardButton(text="📊 BUGUNGI HISOBOT"), KeyboardButton(text="📅 HAFTALIK STATISTIKA")]
    ]
    return ReplyKeyboardMarkup(keyboard=kb, resize_keyboard=True)

def restaurant_menu():
    kb = [
        [KeyboardButton(text="💰 Kunlik savdo (Kirim)")],
        [KeyboardButton(text="💸 Xarajat kiritish")],
        [KeyboardButton(text="⬅️ Orqaga")]
    ]
    return ReplyKeyboardMarkup(keyboard=kb, resize_keyboard=True)

def hotel_menu():
    kb = [
        [KeyboardButton(text="💵 Mijozdan tushum")],
        [KeyboardButton(text="📉 Xarajat kiritish")],
        [KeyboardButton(text="⬅️ Orqaga")]
    ]
    return ReplyKeyboardMarkup(keyboard=kb, resize_keyboard=True)

def personal_menu():
    kb = [
        [KeyboardButton(text="🍕 Ovqat"), KeyboardButton(text="🚕 Yo'l")],
        [KeyboardButton(text="🎸 Boshqa")],
        [KeyboardButton(text="⬅️ Orqaga")]
    ]
    return ReplyKeyboardMarkup(keyboard=kb, resize_keyboard=True)

# 🤖 Moliya Nazorati Telegram Bot

Ushbu bot restoran, mehmonxona va shaxsiy xarajatlarni hisobga olish uchun yaratilgan.

## 🚀 Ishga tushirish yo'riqnomasi

1. **Telegramdan Bot Token oling:**
   - [@BotFather](https://t.me/botfather) ga boring.
   - `/newbot` komandasi orqali yangi bot yarating va API tokenini nusxalab oling.

2. **Kutubxonalarni o'rnating:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Muhit o'zgaruvchisini sozlang:**
   - `.env` faylini yarating va bot tokeningizni yozing:
     ```env
     BOT_TOKEN=Sizning_Tokeningiz_Shu_Yerda
     ```

4. **Botni ishga tushiring:**
   ```bash
   python main.py
   ```

## 🛠 Imkoniyatlar
- **Restoran:** Kunlik savdo va xarajatlarni kiritish, sof foydani hisoblash.
- **Gostinnitsa:** Mijozlardan tushum va xarajatlarni kiritish.
- **Shaxsiy:** Kategoriya (ovqat, yo'l, boshqa) bo'yicha xarajatlarni saqlash.
- **Hisobot:** Bugungi va haftalik statistikani ko'rish.
- **Ma'lumotlar bazasi:** SQLite3 orqali barcha ma'lumotlar saqlanadi.

## 📁 Fayllar strukturasi
- `main.py` - Botning asosiy kodi va handlerlar.
- `database.py` - SQLite ma'lumotlar bazasi bilan ishlash.
- `keyboards.py` - Bot tugmalari (Keyboard).
- `requirements.txt` - Kerakli kutubxonalar ro'yxati.

PAYMOBILE UC 24/7 — Telegram Mini App

Fayllar:
- index.html: mijoz ko‘radigan sahifa
- api/order.js: chek va buyurtma ma’lumotlarini Telegram botga yuboradigan backend
- vercel.json: Vercel sozlamasi

MUHIM:
1) GitHub Pages bu API backendni ishga tushirmaydi. Ushbu GitHub repozitoriyni Vercel’ga import qilib deploy qiling.
2) Vercel Project Settings → Environment Variables bo‘limida:
   BOT_TOKEN = BotFather bergan bot tokeni
   ADMIN_CHAT_ID = 8945194431
   Tokenni GitHub kodiga yozmang va hech kimga yubormang.
3) Deploydan keyin Telegram botga o‘zingiz /start yuboring.
4) Telegram Mini App URL sifatida Vercel deploy URL manzilini ishlating.
5) Hozirgi versiya Click/Payme to‘lovini avtomatik qabul qilmaydi yoki tekshirmaydi. Mijoz ilovada to‘lov qilib, chekni qo‘lda yuklaydi.
6) Botga yuborish faqat backend deploy qilingandan va BOT_TOKEN maxfiy o‘zgaruvchisi kiritilgandan keyin ishlaydi.

Xavfsizlik:
- Bot tokenini index.html ichiga qo‘ymang.
- Bot tokenini GitHub commitiga qo‘ymang.
- Chek fayli 3 MB bilan cheklangan.

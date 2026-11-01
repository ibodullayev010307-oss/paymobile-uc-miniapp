export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Faqat POST so‘rovi mumkin." });
  }

  try {
    const {
      product, price, player_id, nickname, payment_method,
      file_name, mime_type, file_base64, telegram_user
    } = req.body || {};

    if (!product || !price || !player_id || !nickname ||
        !payment_method || !file_name || !mime_type || !file_base64) {
      return res.status(400).json({ error: "Ma’lumotlar to‘liq emas." });
    }

    if (!mime_type.startsWith("image/") &&
        mime_type !== "application/pdf") {
      return res.status(400).json({ error: "Faqat rasm yoki PDF qabul qilinadi." });
    }

    const buffer = Buffer.from(file_base64, "base64");

    if (buffer.length > 3 * 1024 * 1024) {
      return res.status(400).json({ error: "Fayl 3 MB dan katta." });
    }

    const token = process.env.BOT_TOKEN;
    const adminId = process.env.ADMIN_CHAT_ID;

    if (!token || !adminId) {
      return res.status(500).json({ error: "Server sozlamalari to‘liq emas." });
    }

    const userText = telegram_user
      ? `\nTelegram ID: ${telegram_user.id}\nUsername: @${telegram_user.username || "yo‘q"}`
      : "";

    const caption =
      `🛒 YANGI UC BUYURTMASI\n\n` +
      `💎 Paket: ${product}\n` +
      `💰 Summa: ${Number(price).toLocaleString("uz-UZ")} so‘m\n` +
      `🆔 PUBG ID: ${player_id}\n` +
      `👤 Nickname: ${nickname}\n` +
      `💳 To‘lov: ${payment_method}` +
      userText;

    const form = new FormData();
    form.append("chat_id", adminId);
    form.append("caption", caption);

    const blob = new Blob([buffer], { type: mime_type });
    const safeName = file_name.replace(/[^\w.\-]/g, "_").slice(0, 100);

    form.append(
      mime_type === "application/pdf" ? "document" : "photo",
      blob,
      safeName
    );

    const method =
      mime_type === "application/pdf" ? "sendDocument" : "sendPhoto";

    const response = await fetch(
      `https://api.telegram.org/bot${token}/${method}`,
      { method: "POST", body: form }
    );

    const result = await response.json();

    if (!result.ok) {
      return res.status(502).json({
        error: "Telegram’ga yuborilmadi. Bot sozlamalarini tekshiring."
      });
    }

    return res.status(200).json({ ok: true });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Serverda xatolik yuz berdi." });
  }
  }

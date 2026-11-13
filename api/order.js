export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.ADMIN_CHAT_ID;
  const {restaurant, item, total, profit, name, phone, addr} = req.body || {};
  const msg = `🍔 طلب جديد - أكّيل\n📍 ${restaurant}\n🛒 ${item}\n👤 ${name}\n📞 ${phone}\n🏠 ${addr}\n💰 ${total}ج ربحك ${profit}ج`;
  const tg = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST', headers: {'Content-Type':'application/json'},
    body: JSON.stringify({chat_id: CHAT_ID, text: msg})
  });
  const data = await tg.json();
  return res.status(200).json(data);
}

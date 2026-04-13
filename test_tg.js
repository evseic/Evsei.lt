const botToken = "8777803315:AAG9JBPYyOUymcXQLaw9wI2utF6GZRlf1O8";
const chatId = "6324842399";
const text = "🔥 Новая заявка\n\n👤 Имя: Test\n📱 Whatsapp: +123 | TG: @test\nInstagram/ Tiktok: N/A";

fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ chat_id: chatId, text: text })
}).then(res => res.json()).then(console.log).catch(console.error);

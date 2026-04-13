const TELEGRAM_BOT_TOKEN = "8777803315:AAG9JBPYyOUymcXQLaw9wI2utF6GZRlf1O8";
const TELEGRAM_CHAT_ID = "6324842399";

const text = `1. What is your name and age?
Anna - 22 years old

2. What is your nationality?
Latvia

3. Do you have a registered OnlyFans profile?
Да

4. Have you worked with agencies before?
Да

6. Are you willing to film masturbation and show your face in the content?
Да

7. Are you willing to make custom videos? (Custom videos must be completed within 24-48 hours.)
Да`;

async function testTg() {
    try {
        console.log("Sending text: ", text);
        const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: "Message 1 check" })
        });
        console.log("Response:", await res.json());
    } catch(e) {
        console.error(e);
    }
}
testTg();

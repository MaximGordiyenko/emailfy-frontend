## 💬 Website Chat

### 🛒 Business requirements 

Develop a MVP support chat widget for a website that integrates with Telegram, allowing a business to respond to 
customer messages directly from Telegram. The deployed solution must fit free tier for check POC.

### ⚙️ Chat Functional Flow

1. Chat Widget sends messages to a backend.
2. Backend forwards messages to a single Telegram bot chat.
3. Replies from the Telegram bot chat go back to the correct user on the website.
4. Session and message history stored in database.

## ⚙️ Consideration of Architectural Approaches

| Feature                     | **Telegram Bot**                         | **WebSocket**                                 |
|-----------------------------|------------------------------------------|-----------------------------------------------|
| ✅ **Official Support**      | ✅ Yes – fully supported by Telegram      | ⚠️ Not specific to Telegram                   |
| 🔐 **Security**             | 🔐 High – managed via Telegram Bot API   | 🔐 Secure if implemented properly (JWT, etc.) |
| ⚙️ **Automation**           | ✅ Full automation via Bot API            | ⚙️ Useful for server-push to frontend         |
| 🛠️ **Use Case Fit**        | ✅ Great for business/workflow automation | ✅ Ideal for live UI updates in web apps       |
| 🔄 **Two-way Messaging**    | ✅ Yes – using Webhook or long polling    | ✅ Yes – ideal for real-time bidirectional     |
| 🌐 **Frontend Integration** | ⚠️ Indirect – needs server to bridge     | ✅ Direct – perfect for live UIs               |
| 💰 **Cost/Effort**          | ✅ Low – easy with Bot API + Webhooks     | ⚠️ Medium – requires infra for WebSocket      |

👉 Use a Telegram Bot. It’s safe, reliable.

### ⚙️ Core Communication Flow

| Feature                    | **Webhook**                     | **Long Polling**                   |
|----------------------------|---------------------------------|------------------------------------|
| 📡 Real-time updates       | ✅ Yes – Telegram pushes updates | ⏱️ Yes, but with delay             |
| 🌐 Requires public URL     | ✅ Yes (needs HTTPS endpoint)    | ❌ No – can run locally             |
| 🧠 Server resource usage   | ✅ Efficient (event-driven)      | ❌ Less efficient (polling loop)    |
| 🛠️ Easier to deploy (MVP) | Needs Fly.io / Render etc.      | Can run on local dev env           |
👉 Use Webhooks cos Telegram sends updates instantly.

### 📲 Feature
1. Resume pooling messages after significant amount of time inactivity.
2. Show FAQ when chat start
3. Integrate AI to Telegram bot to answer on FAQ

### ⚙️ Setup Telegram for Local Development
Telegram cannot reach your localhost, so you must expose your local backend via [`Telegram Webhook:` ngrok](https://ngrok.com/).
#### Start ngrok tunnel
###### copy/paste command into terminal, then run:

`npx ngrok http 4001`

#### Forwarding Messages
###### when tunnel is open necessary forward messages to telegram, copy url:
`https://fc5c-85-209-46-229.ngrok-free.app -> http://localhost:4001`

#### Forwarding
###### replace url om offered, then run curl:
`curl -F "url=https://fc5c-85-209-46-229.ngrok-free.app/webhook" \
     https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook
`

Result: `{"ok":true,"result":true,"description":"Webhook was set"}% `

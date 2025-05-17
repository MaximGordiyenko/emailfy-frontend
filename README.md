<h1 align="center">
  <em>Mailfly | Email Marketing Platform</em>
</h1>

<div align="center" style="display: flex; justify-content: center; align-items: flex-start; gap: 10px; flex-wrap: wrap;">

  <!-- First Column -->
  <div>
    <img src="https://res.cloudinary.com/maxigord/image/upload/v1747171788/Mailfly/dashboard_j5ghep.png" 
      width="300" style="border-radius: 8px;">
  </div>

  <!-- Second Column -->
  <div style="display: flex; flex-direction: column; gap: 10px;">
    <img src="https://res.cloudinary.com/maxigord/image/upload/v1747172238/Mailfly/Default_xe1eoe.png" 
      width="206" style="border-radius: 8px;">
    <img src="https://res.cloudinary.com/maxigord/image/upload/v1747174393/Mailfly/Send_now_alyxev.png" 
      width="206" style="border-radius: 8px;">
    <img src="https://res.cloudinary.com/maxigord/image/upload/v1747172148/Mailfly/Compaigns_Emails_cegtny.png" 
      width="206" style="border-radius: 8px;"> 
    <img src="https://res.cloudinary.com/maxigord/image/upload/v1747172252/Mailfly/Campaigns_hnidyn.png" 
      width="206" style="border-radius: 8px;">
  </div>

  <!-- Third Column -->
   <div style="display: flex; flex-direction: column; gap: 10px;">
     <img src="https://res.cloudinary.com/maxigord/image/upload/v1747173463/Mailfly/Screenshot_2025-05-14_at_00.56.43_rzz3az.png" 
       width="425" style="border-radius: 8px;">

   <div style="display: flex; gap: 8px;">
     <img src="https://res.cloudinary.com/maxigord/image/upload/v1747174551/Mailfly/Settings_Account_Settings_2FA_yipsik.png" 
       width="210" style="border-radius: 8px;">
     <img src="https://res.cloudinary.com/maxigord/image/upload/v1747174547/Mailfly/AI_Campaign_Subject_4_esvdwp.png" 
       width="210" style="border-radius: 8px;">
   </div>

   <div style="display: flex; gap: 8px;">
    <img src="https://res.cloudinary.com/maxigord/image/upload/v1747172252/Mailfly/Campaigns_hnidyn.png" 
      width="210" style="border-radius: 8px;">
    <img src="https://res.cloudinary.com/maxigord/image/upload/v1747172162/Mailfly/B_Campaigns_tdandz.png"
      width="210" style="border-radius: 8px;">
   </div>

  </div>
</div>


## 🚀 Core Platform Features

| Pages        | Goal                                                              | Functionalities                                                                         |
|--------------|-------------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| 🔐 Auth      | Secure user identity and control access to platform functionality | Email/password login, JWT sessions, 2FA, OAuth, role-based access, token management     |
| ✅ Dashboard  | Provide a high-level overview of account performance and activity | KPI cards, recent campaigns, quota widget, activity feed, quick actions                 |
| 📊 Analytics | Visualize campaign and engagement data through intuitive reports  | Charts for opens/clicks, breakdown by segment/device, campaign comparison, export tools |
| 👥 Audience  | Manage contact lists and create targeted segments                 | Contact grid, tagging, segmentation, imports/exports, filtering, contact profile view   |
| ✉️ Campaigns | Build, send, and optimize email campaigns                         | Campaign wizard, template editor, scheduling, A/B testing, per-campaign analytics       |
| ⚙️ Settings  | Configure account, teams, branding, and developer integrations    | Billing, roles & invites, domain setup, API key/token management, brand customization   |

## 🧩 Add-on Features

| Feature            | Goal                                                              | Key Functionalities                                                                                  |
|--------------------|-------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|
| 💬 Support Chat    | Enable real-time support communication between users and the team | Website chat widget, Telegram integration, message forwarding with session context, visitor tracking |
| 📥 Email Templates | Enhance campaign creation with ready-made, customizable templates | Pre-built templates, drag-and-drop editor, brand presets, reusable blocks                            |
| 🔔 Notifications   | Keep users informed about system events or campaign statuses      | Email/push notifications for campaign sends, quota alerts, bounced contacts                          |

---

##  💬 Support Chat

#### Research Telegram Bot Communication Methods
| **Feature**                 | **Webhook (Telegram)**                       | **Long Polling (Telegram)**        | **WebSocket**                             |
|-----------------------------|----------------------------------------------|------------------------------------|-------------------------------------------|
| ✅ **Official Support**      | ✅ Yes – Fully supported                      | ✅ Yes – Fully supported            | ❌ No – Not natively supported by Telegram |
| 📡 **Real-time Updates**    | ✅ Yes – Instant Telegram push                | ⏱️ Yes – But slight delay          | ✅ Yes – Real-time bi-directional          |
| 🌐 **Requires Public URL**  | ✅ Yes – HTTPS endpoint required              | ❌ No – Can run on localhost        | ✅ Yes – Needs public WS server            |
| 🔐 **Security**             | 🔐 High – Managed by Telegram                | 🔐 High – Managed by Telegram      | 🔐 High – If implemented with TLS & Auth  |
| ⚙️ **Server Load**          | ✅ Low – Event-based                          | ❌ Higher – Continuous polling loop | ⚠️ Depends – Persistent connections       |
| 🚀 **Deployment Ease**      | ⚠️ Needs public HTTPS (e.g., Fly.io, Render) | ✅ Easiest – Great for dev/testing  | ❌ Harder – Requires WS infra              |
| 🧩 **Frontend Integration** | ❌ Indirect – Needs backend                   | ❌ Indirect – Needs backend         | ✅ Direct – Ideal for frontend UIs         |
| 🔁 **Two-way Messaging**    | ✅ Yes – Handles updates/responses            | ✅ Yes – Handles updates/responses  | ✅ Yes – Real-time bidirectional chat      |
| 🧠 **Best Use Case**        | ✅ Production bots needing reliability        | ✅ Quick prototypes/dev bots        | ✅ Live UIs, games, dashboards             |
| 💰 **Cost/Effort**          | ✅ Low – Simple + efficient                   | ✅ Low – Easy to start              | ⚠️ Medium – Needs infra/setup             |

### 🧪 Setup Telegram Webhook (Local Development)
##### Telegram cannot reach your localhost directly, so you’ll need to expose your local server using a tunneling service like [ngrok](https://ngrok.com).

1. Start a tunnel with ngrok, run in terminal:
```bash
npx ngrok http 4001
```
2. Copy the HTTPS forwarding URL from output of ngrok:
```
https://fc5c-85-209-46-229.ngrok-free.app -> http://localhost:4001
```

3. Register the tunnel with Telegram, replace <YOUR_BOT_TOKEN> and run:
```curl
curl -F "url=https://fc5c-85-209-46-229.ngrok-free.app/webhook" \
https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook
```
###### ✅ Your Telegram bot will now forward incoming messages to your local server via ngrok.

### 🚀 Setup Telegram Webhook (Production)
##### In production, Telegram must send messages to a publicly accessible HTTPS URL served by your backend.

1. Ensure your backend is live and secured over HTTPS:
```url
https://api.yourdomain.com/webhook
```

2. Register the production webhook, replace <YOUR_BOT_TOKEN> and run:
```url
curl -F "url=https://api.yourdomain.com/webhook" \
https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook
```

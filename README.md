# WhatsApp Group Monitor & n8n Integration Bot

This Node.js project utilizes the **Baileys** library to monitor messages from a specific user within a group and forward them automatically to an automation workflow in **n8n**.

This version is optimized for server environments (VPS) and Docker containers, fixing common connection failures and ensuring session persistence.

## Features

- **Auto-Version Patch:** Automatically detects the latest WhatsApp Web version to prevent the `405 Method Not Allowed` error.
- **Browser Spoofing:** Updated browser headers to reduce the risk of IP banning in Data Centers.
- **Robust Persistence:** Engineered for Docker volumes, eliminating the need for frequent QR Code rescanning.

---

------------------------------------------------------------
FEATURES
------------------------------------------------------------

- Connects to WhatsApp Web using Baileys with multi-file authentication.
- Generates a QR Code in the terminal for first-time authentication.
- Monitors messages from a specific user in a specific group.
- Sends messages to an n8n webhook for automation workflows.
- Includes routes:
  - list-groups.js → Lists all WhatsApp groups the account participates in.
  - index-geral.js → General entry point for custom workflows.
  - index.js → Main entry point to run the bot fully.
- Fully configurable via .env.

------------------------------------------------------------
FILE STRUCTURE
------------------------------------------------------------

.<br>
├── auth/               # Stores session keys (Generated automatically)<br>
├── .env                # Configuration variables (NEVER commit to Git)<br>
├── .gitignore          # Sensitive file protection<br>
├── Dockerfile          # Instructions for Easypanel/Docker builds<br>
├── index.js            # Main bot with filtering and webhook logic<br>
├── list-groups.js      # Utility to discover Group IDs (JID)<br>
├── package.json        # Project dependencies<br>
└── README.md           # Documentation<br>

------------------------------------------------------------
PREREQUISITES
------------------------------------------------------------

- Node.js >= 18
- npm
- WhatsApp account
- n8n webhook URL
- Internet connection

------------------------------------------------------------
INSTALLATION
------------------------------------------------------------

1. Clone the repository:
   git clone [https://github.com/cauerast/BotWhatsapp.git](https://github.com/cauerast/BotWhatsapp.git)<br><br>
   cd BotWhatsapp<br>

2. Install dependencies:<br>
   npm install

3. Create a .env file:

   N8N_WEBHOOK=https://github.com/cauerast/BotWhatsapp<br><br>
   GROUP_ID=123456789101112131415161718@g.us<br><br>
   TARGET_NUMBER=5599999999999@s.whatsapp.net<br>

------------------------------------------------------------
USAGE
------------------------------------------------------------

1. Run the main bot:<br>
   node index.js

   - Generates QR Code
   - Connects to WhatsApp
   - Monitors group and forwards messages to n8n

2. List all WhatsApp groups:<br>
   node list-groups.js

   Use this to find your GROUP_ID.

3. General workflow route:<br>
   node index-geral.js

------------------------------------------------------------
ENVIRONMENT VARIABLES
------------------------------------------------------------

N8N_WEBHOOK     → Your n8n webhook URL<br>
GROUP_ID        → WhatsApp group ID to monitor<br>
TARGET_NUMBER   → Specific WhatsApp number to filter messages<br>

------------------------------------------------------------
EXAMPLE OUTPUT
------------------------------------------------------------

----------SCAN THE QR CODE BELOW----------
(qrcode)

----------Connected to WhatsApp!----------

Message filtered: Hello World!<br>
Sent to n8n successfully!<br>

------------------------------------------------------------
LICENSE
------------------------------------------------------------

MIT License

------------------------------------------------------------
AUTHOR
------------------------------------------------------------

Cauê Silva Rasteiro<br>
GitHub: https://github.com/cauerast<br>
LinkedIn: https://www.linkedin.com/in/cauê-rast-26bba22a6/<br>

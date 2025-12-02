# WhatsApp Group Monitor & n8n Integration Bot

A Node.js project that connects to WhatsApp Web via Baileys, monitors messages from a specific user in a specific group, and forwards them to an n8n webhook. The project also includes routes for listing all groups and running the bot in different modes.

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
├── .env<br>
├── .gitignore<br>
├── index.js<br>
├── index-geral.js<br>
├── list-groups.js<br>
├── package.json<br>
├── package-lock.json<br>
└── requirements.txt<br>

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
   git clone https://github.com/YOUR_USERNAME/whatsapp-n8n-bot.git<br><br>
   - on terminal: <br>
   cd whatsapp-n8n-bot<br>

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
<QR CODE>

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

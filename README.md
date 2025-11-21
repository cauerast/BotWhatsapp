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

.
├── .env
├── .gitignore
├── index.js
├── index-geral.js
├── list-groups.js
├── package.json
├── package-lock.json
└── requirements.txt

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
   git clone https://github.com/YOUR_USERNAME/whatsapp-n8n-bot.git
   cd whatsapp-n8n-bot

2. Install dependencies:
   npm install

3. Create a .env file:

   N8N_WEBHOOK=https://your-n8n-instance/webhook/whatsapp
   GROUP_ID=120363000000000000@g.us
   TARGET_NUMBER=5511999999999@s.whatsapp.net

------------------------------------------------------------
USAGE
------------------------------------------------------------

1. Run the main bot:
   node index.js

   - Generates QR Code
   - Connects to WhatsApp
   - Monitors group and forwards messages to n8n

2. List all WhatsApp groups:
   node list-groups.js

   Use this to find your GROUP_ID.

3. General workflow route:
   node index-geral.js

------------------------------------------------------------
ENVIRONMENT VARIABLES
------------------------------------------------------------

N8N_WEBHOOK     → Your n8n webhook URL
GROUP_ID        → WhatsApp group ID to monitor
TARGET_NUMBER   → Specific WhatsApp number to filter messages

------------------------------------------------------------
EXAMPLE OUTPUT
------------------------------------------------------------

----------SCAN THE QR CODE BELOW----------
<QR CODE>

----------Connected to WhatsApp!----------

Message filtered: Hello World!
Sent to n8n successfully!

------------------------------------------------------------
LICENSE
------------------------------------------------------------

MIT License

------------------------------------------------------------
AUTHOR
------------------------------------------------------------

Cauê Silva Rasteiro
GitHub: https://github.com/cauerast
LinkedIn: https://www.linkedin.com/in/cauê-rast-26bba22a6/

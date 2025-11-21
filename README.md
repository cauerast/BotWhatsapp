# WhatsApp Group Monitor & n8n Integration Bot

A Node.js project that connects to WhatsApp Web via **Baileys**, monitors messages from a specific user in a specific group, and forwards them to an **n8n webhook**. The project also includes routes for listing all groups and running the bot in different modes.

---

## Features

- Connects to WhatsApp Web using Baileys with multi-file authentication.
- Generates a **QR Code** in the terminal for first-time authentication.
- Monitors messages from a **specific user** in a **specific group**.
- Sends messages to an **n8n webhook** for automation workflows.
- Includes routes:
  - `list-groups.js` → Lists all WhatsApp groups the account participates in.
  - `index-geral.js` → General entry point for custom workflows.
  - `index.js` → Main entry point to run the bot fully.
- Fully configurable via `.env`.

---

## File Structure

.
├── .env # Environment variables
├── .gitignore
├── index.js # Main bot execution file
├── index-geral.js # General route for workflows
├── list-groups.js # Route to list all WhatsApp groups
├── package.json
├── package-lock.json
└── requirements.txt

yaml
Copiar código

---

## Prerequisites

- Node.js >= 18
- npm
- WhatsApp account
- n8n workflow endpoint (webhook URL)
- Internet connection

---

## Installation

1. Clone this repository:

```bash
git clone https://github.com/YOUR_USERNAME/whatsapp-n8n-bot.git
cd whatsapp-n8n-bot
Install dependencies:

bash
Copiar código
npm install
Create a .env file at the root:

env
Copiar código
N8N_WEBHOOK=https://your-n8n-instance/webhook/whatsapp
GROUP_ID=123456789-123456@g.us
TARGET_NUMBER=551199999999@s.whatsapp.net
Usage
1. Run Main Bot
bash
Copiar código
node index.js
Generates a QR code in the terminal if first-time login.

Listens for messages from the target number in the target group.

Sends messages to the configured n8n webhook.

2. List Groups
bash
Copiar código
node list-groups.js
Outputs all WhatsApp groups the account participates in.

Useful for obtaining GROUP_ID automatically.

3. General Workflow Route
bash
Copiar código
node index-geral.js
Custom entry point for general workflows or testing automation.

Code Overview
Baileys Integration: Handles WhatsApp Web connection, authentication, and message listening.

n8n Integration: Sends JSON payloads with message content to a specified webhook.

Message Filtering: Only forwards messages from TARGET_NUMBER in GROUP_ID.

QR Code Authentication: First-time login generates a terminal QR code for scanning.

Example Output
css
Copiar código
----------SCAN THE QR CODE BELOW----------
[QR Code in terminal]

----------Connected to WhatsApp!----------

----------Message filtered: Hello World!----------

----------Sent to n8n----------
Environment Variables
Variable	Description
N8N_WEBHOOK	URL of your n8n webhook to send messages
GROUP_ID	WhatsApp group ID to monitor
TARGET_NUMBER	Phone number of the user to track (E.164)

License
This project is licensed under the MIT License.
Feel free to use, modify, and distribute.

Author
Cauê Silva Rasteiro
GitHub | LinkedIn

yaml
Copiar código

---

This README:  
- Explains the **project purpose and workflow**.  
- Includes **setup and running instructions**.  
- Documents **file structure and environment variables**.  
- Uses a **professional, GitHub-ready style**.  

---
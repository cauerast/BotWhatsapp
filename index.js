import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys"
import axios from "axios"
import qrcode from "qrcode-terminal"

const N8N_WEBHOOK = "https://n8n-n8n.e4wfok.easypanel.host/webhook/whatsapp/"

async function start() {
    const { state, saveCreds } = await useMultiFileAuthState("./auth");

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        browser: ["Ubuntu", "Chrome", "109.0"],
        syncFullHistory: false,
        markOnlineOnConnect: false,
    })

    // --- QR CODE ---
    sock.ev.on("connection.update", (update) => {
        const { connection, qr, lastDisconnect } = update

        if (qr) {
            console.log("\n\n----- SCAN THIS QR CODE: -----\n\n")
            qrcode.generate(qr, { small: true })
        }

        if (connection === "open") {
            console.log("\n\n---------- Connected to WhatsApp! ----------\n\n")
        }

        // Auto-reconnect on disconnect
        if (connection === "close") {
            const shouldReconnect =
                lastDisconnect?.error?.output?.statusCode !== 401;
            console.log("\n\n---------- Reconecting... ----------\n\n", lastDisconnect?.error)
            if (shouldReconnect) {
                console.log("\n\n----------- Reconnecting... ------------\n\n")
                start()
            }
        }
    })

    sock.ev.on("creds.update", saveCreds)

    // --- RECEIVE MESSAGES ---
    sock.ev.on("messages.upsert", async (m) => {
        const msg = m.messages[0]

        if (!msg.message) return
        if (msg.key.fromMe) return

        const sender = msg.key.remoteJid

        const text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text ||
            msg.message?.imageMessage?.caption ||
            ""

        console.log(`\n\n---------- Message from ${sender}: ${text} -------------\n\n`)

        // sent to n8n
        try {
            await axios.post(N8N_WEBHOOK, {
                sender,
                text,
                raw: msg
            })
            console.log("\n\n---------- Sent to n8n ----------\n\n")
        } catch (err) {
            console.log("\n\n---------- Error sending to n8n ----------\n\n", err.message)
        }
    })
}

start()
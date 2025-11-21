import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys"
import axios from "axios"
import qrcode from "qrcode-terminal"

const N8N_WEBHOOK = "https://n8n-n8n.e4wfok.easypanel.host/webhook-test/whatsapp"

async function start() {
    const { state, saveCreds } = await useMultiFileAuthState("./auth")

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
            console.log("\n📌 SCAN THIS QR CODE:\n")
            qrcode.generate(qr, { small: true })
        }

        if (connection === "open") {
            console.log("✅ Connected to WhatsApp!")
        }

        // Auto-reconnect on disconnect
        if (connection === "close") {
            const shouldReconnect =
                lastDisconnect?.error?.output?.statusCode !== 401
            console.log("❌ Disconnected", lastDisconnect?.error)
            if (shouldReconnect) {
                console.log("🔄 Reconnecting...")
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

        console.log(`📩 Message from ${sender}: ${text}`)

        // Send to n8n
        try {
            await axios.post(N8N_WEBHOOK, {
                sender,
                text,
                raw: msg
            })
            console.log("➡️ Sent to n8n")
        } catch (err) {
            console.log("❌ Error sending to n8n:", err.message)
        }
    })
}

start()
import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys";
import axios from "axios";
import qrcode from "qrcode-terminal";
import dotenv from "dotenv";

dotenv.config();

const N8N_WEBHOOK = process.env.N8N_WEBHOOK; // URL do webhook do n8n
const GROUP_ID = process.env.GROUP_ID;  // ID do grupo 
const TARGET_NUMBER = process.env.TARGET_NUMBER; // número do usuário

async function start() {
    const { state, saveCreds } = await useMultiFileAuthState("./auth");

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        browser: ["Ubuntu", "Chrome", "109.0"],
        syncFullHistory: false,
        markOnlineOnConnect: false,
    });

    sock.ev.on("connection.update", (update) => {
        const { connection, qr } = update;
        if (qr) qrcode.generate(qr, { small: true });
        if (connection === "open") console.log("\n\n----------Connected to WhatsApp!----------\n\n");
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("messages.upsert", async (m) => {
        const msg = m.messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const sender = msg.key.participant || msg.key.remoteJid; 
        const chatId = msg.key.remoteJid; 
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text || "";

        // Filtra apenas mensagens do TARGET_NUMBER no grupo específicado
        if (chatId === GROUP_ID && sender === TARGET_NUMBER) {
            console.log("\n\n----------Message filtered:", text,"\n\n");

            // POST 
            try {
                await axios.post(N8N_WEBHOOK, { sender, text, raw: msg });
                console.log("\n\n----------Send to n8n----------\n\n");
            } catch (err) {
                console.error("\n\n----------Error sending to n8n:", err.message,"\n\n");
            }
        }
    });
}

start();

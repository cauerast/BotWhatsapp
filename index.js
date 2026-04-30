import makeWASocket, { useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } from "@whiskeysockets/baileys";
import axios from "axios";
import qrcode from "qrcode-terminal";
import dotenv from "dotenv";

dotenv.config();

const N8N_WEBHOOK = process.env.N8N_WEBHOOK;

async function start() {
    const { version, isLatest } = await fetchLatestBaileysVersion();
    console.log(`Usando WA v${version.join('.')}, isLatest: ${isLatest}`);

    const { state, saveCreds } = await useMultiFileAuthState("./auth");

    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: false,
        // lembrar de atualizar o browser
        browser: ["Windows", "Chrome", "122.0.6261.129"], 
        syncFullHistory: false,
        markOnlineOnConnect: false,
        connectTimeoutMs: 60000, 
        defaultQueryTimeoutMs: 0,
    });

    // --- QR CODE E CONEXÃO ---
    sock.ev.on("connection.update", (update) => {
        const { connection, qr, lastDisconnect } = update;

        if (qr) {
            console.log("\n\n----- ESCANEIE ESTE QR CODE: -----\n\n");
            qrcode.generate(qr, { small: true });
        }

        if (connection === "open") {
            console.log("\n\n---------- Conectado ao WhatsApp! ----------\n\n");
        }

        if (connection === "close") {
    
            const statusCode = lastDisconnect?.error?.output?.statusCode;
            const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
            
            console.log(`\n\n---------- Conexão fechada (Status: ${statusCode}) ----------\n\n`);

            if (shouldReconnect) {
                console.log("Reconectando...");
                start();
            } else {
                console.log("Você foi desconectado. Apague a pasta 'auth' e escaneie novamente.");
            }
        }
    });

    sock.ev.on("creds.update", saveCreds);

    // --- RECEBIMENTO DE MENSAGENS ---
    sock.ev.on("messages.upsert", async (m) => {
        const msg = m.messages[0];

        if (!msg.message || msg.key.fromMe) return;

        const sender = msg.key.remoteJid;
        const text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text ||
            msg.message?.imageMessage?.caption ||
            "";

        console.log(`\nMensagem de ${sender}: ${text}`);

        // Enviar para o n8n
        try {
            await axios.post(N8N_WEBHOOK, {
                sender,
                text,
                timestamp: msg.messageTimestamp,
                pushName: msg.pushName,
                raw: msg
            });
            console.log(">>> Enviado para o n8n com sucesso.");
        } catch (err) {
            console.log(">>> Erro ao enviar para o n8n:", err.message);
        }
    });
}

start();
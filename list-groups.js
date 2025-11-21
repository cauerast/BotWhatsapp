import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys";
import qrcode from "qrcode-terminal";

async function start() {
    const { state, saveCreds } = await useMultiFileAuthState("./auth");

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
    });

    sock.ev.on("creds.update", saveCreds);

    // Espera conexão e sync inicial
    await new Promise(resolve => {
        sock.ev.on("connection.update", (update) => {
            const { connection, lastDisconnect, qr } = update;

            if(qr) {
                console.log("📌 Escaneie o QR Code:");
                qrcode.generate(qr, { small: true });
            }

            if(connection === "open") {
                console.log("✅ Conectado!");
                resolve(); // conexão pronta, pode buscar grupos
            }

            if(connection === "close") {
                console.log("❌ Conexão fechada:", lastDisconnect?.error);
            }
        });
    });

    // Agora a sessão está pronta → busca todos os grupos
    const allGroups = await sock.groupFetchAllParticipating();
    Object.values(allGroups).forEach(g => {
        console.log("Group name:", g.subject);
        console.log("Group ID:", g.id);
    });
}

start();

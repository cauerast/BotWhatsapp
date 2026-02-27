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
                console.log("\n\n---------- Escaneie o QR Code: ----------\n\n");
                qrcode.generate(qr, { small: true });
            }

            if(connection === "open") {
                console.log("\n\n---------- Conectado! ----------\n\n");
                resolve(); // conexão pronta, pode buscar grupos
            }

            if(connection === "close") {
                console.log("\n\n---------- Conexão fechada: ----------\n\n", lastDisconnect?.error);
            }
        });
    });

    // Agora a sessão está pronta → busca todos os grupos
    const allGroups = await sock.groupFetchAllParticipating();
    Object.values(allGroups).forEach(g => {  // g means group
        console.log("Group name:", g.subject);
        console.log("Group ID:", g.id); 
    });
}

start();
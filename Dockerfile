FROM node:20-slim

RUN apt update && apt install -y git && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN mkdir -p /app/auth

VOLUME ["/app/auth"]

CMD ["node", "index.js"]

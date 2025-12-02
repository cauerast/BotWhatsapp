FROM node:20-slim

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

RUN mkdir -p /app/auth

VOLUME ["/app/auth"]

CMD ["node", "index.js"]

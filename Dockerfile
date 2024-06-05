FROM node:20-alpine

COPY package*.json ./

RUN npm install express
COPY . .
EXPOSE 3000
ENTRYPOINT ["node","src/index.js"]


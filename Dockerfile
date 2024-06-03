FROM node:20.13.1

COPY package*.json ./

RUN npm install express
COPY . .
EXPOSE 3000
ENTRYPOINT ["node","src/index.js"]

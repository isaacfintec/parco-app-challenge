FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./
COPY . .
RUN npm install

EXPOSE 8000

CMD ["npm", "start"]
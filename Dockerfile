FROM node:14.10.0-alpine3.12
WORKDIR /invo
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm","start" ]
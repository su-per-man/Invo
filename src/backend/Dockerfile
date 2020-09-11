FROM node:14.10.0-alpine3.12
WORKDIR /backend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm","start"]
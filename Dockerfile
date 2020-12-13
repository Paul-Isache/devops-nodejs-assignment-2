FROM node:12.9-alpine
ENV NODE_ENV=production

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
ENTRYPOINT ["npm", "start"]
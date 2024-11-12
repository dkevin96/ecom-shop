FROM node:16.20.2-bookworm

RUN apt-get update
RUN apt-get install -y python3

WORKDIR /app

COPY server/client/package.json ./
RUN npm install

# COPY server/client/ .

EXPOSE 3000

# CMD ["npm", "start"]
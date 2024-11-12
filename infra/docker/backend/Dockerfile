FROM node:14.16.0

WORKDIR /app

COPY server/package.json ./

RUN npm install

EXPOSE 5000

CMD ["npm", "start"]
FROM node:18-alpine3.14

WORKDIR /

COPY . .

RUN npm install

ENV port=5000

EXPOSE 5000

CMD [ "node", "index.js" ]

FROM node:alpine

WORKDIR /usr/klezy-frontend

COPY ./ ./

RUN npm install

EXPOSE 5173

CMD [ "npm","run","dev" ]
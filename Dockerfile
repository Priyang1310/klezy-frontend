FROM node:alpine

WORKDIR /usr/klezy-frontend

COPY ./ ./

RUN npm install

EXPOSE 5174

CMD [ "npm","run","dev" ]
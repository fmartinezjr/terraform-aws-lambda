FROM node:20.11-bookworm as build_base

WORKDIR .

COPY package*.json yarn.lock ./

RUN yarn install

COPY dist/ .

EXPOSE 3200

CMD ["node", "index.js"]
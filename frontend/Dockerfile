FROM node:lts-alpine

RUN apk --no-cache add curl

WORKDIR /app

COPY public public
COPY index.html index.html

COPY tsconfig.json tsconfig.json
COPY tsconfig.app.json tsconfig.app.json
COPY tsconfig.node.json tsconfig.node.json
COPY vite.config.ts vite.config.ts
COPY tailwind.config.js tailwind.config.js
COPY postcss.config.js postcss.config.js
COPY codegen.ts codegen.ts


COPY package.json package.json
RUN npm install

COPY src src

CMD npm run dev 
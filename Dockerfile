FROM node:16
WORKDIR /opt/app
ADD package.json package.json
RUN yarn install
ADD . .
RUN yarn run build
RUN npm prune --production
CMD ["node","./dist/main.js"]

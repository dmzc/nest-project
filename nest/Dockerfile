# build-stage
FROM node:latest as build-stage
WORKDIR /nest-server
COPY  package.json .

RUN npm config set registry http://registry.npmmirror.com/

RUN npm install

COPY . .
RUN npm run build

# production-stage
FROM node:latest as production-stage

COPY --from=build-stage /nest-server/dist /nest-server
COPY --from=build-stage /nest-server/package.json /nest-server/package.json
WORKDIR /nest-server

RUN npm config set registry http://registry.npmmirror.com/
RUN npm install --production

EXPOSE 3000
CMD node /nest-server/main.js
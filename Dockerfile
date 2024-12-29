# docker run -p 80:80 client-admin
# build environment
FROM node:16.20-bullseye AS build
WORKDIR /app

ARG BUILD_ENV
# ARG SEMVER
ENV PATH /node_modules/.bin:$PATH
COPY package.json /package.json
# RUN npm install -g npm@9.6.7
# RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN npm install --legacy-peer-deps
# RUN npm config set unsafe-perm true #https://stackoverflow.com/questions/52196518/could-not-get-uid-gid-when-building-node-docker
COPY . /
# RUN npm version $SEMVER && npm run build-$BUILD_ENV
RUN npm run build
EXPOSE 3000

# production environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
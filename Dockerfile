FROM node:12-slim AS build
WORKDIR /usr/src/app
COPY ./TranslationUI/package.*json ./
RUN npm install
COPY ./TranslationUI .
RUN npm run build-prod

FROM nginx:1.17.1-alpine
COPY ./TranslationUI/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/TranslationUI /usr/share/nginx/html
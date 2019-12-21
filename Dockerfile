FROM node:13-stretch as build
WORKDIR /var/myrunes
ADD . .
RUN npm ci &&\
    npm run build

FROM nginx:latest AS final
LABEL maintainer="zekro <contact@zekro.de>"
WORKDIR /app
COPY --from=build /var/myrunes/dist .
ADD ./config/nginx.conf /etc/nginx/conf.d/myrunes.conf

EXPOSE 8080

FROM node:13-stretch as build
WORKDIR /var/myrunes
ADD . .
RUN [ -e ${VUE_APP_API_HOST_URL} ] ||\
    echo "VUE_APP_API_HOST_URL=${VUE_APP_API_HOST_URL}" \
    >> .env
RUN echo "VUE_APP_VERSION=$(git describe --tags --abbrev=0)+$(git describe --tags | sed -n 's/^[0-9]\+\.[0-9]\+\.[0-9]\+-\([0-9]\+\)-.*$/\1/p')" \
    >> .env
RUN npm ci &&\
    npm run build

FROM nginx:latest AS final
LABEL maintainer="zekro <contact@zekro.de>"
WORKDIR /app
COPY --from=build /var/myrunes/dist .
ADD ./config/nginx.conf /etc/nginx/conf.d/myrunes.conf

EXPOSE 8080

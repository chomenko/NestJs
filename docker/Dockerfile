FROM alpine:latest

ENV TZ=Europe/Prague
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apk add --no-cache gettext \
    bash \
    mariadb-client \
    nodejs \
    npm


RUN npm install -g npm@latest
RUN npm --version

COPY ./ /app

COPY ./docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod 0777 /usr/local/bin/entrypoint.sh

WORKDIR /app

RUN npm i -g ts-morph

CMD sh /usr/local/bin/entrypoint.sh

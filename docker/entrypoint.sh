#!/bin/bash

set -e

cd /app

sh /app/docker/initialize.db.sh

if [ ! -d "/app/node_modules" ]; then
  npm install --verbose
fi

echo "${ENVIRONMENT}"

if [ "${ENVIRONMENT}" == "testing" ]; then
  npm run test
elif [ "${ENVIRONMENT}" == "development" ]; then
  npm run build
  npm run start:dev
elif [ "${ENVIRONMENT}" == "production" ]; then
  npm run build
  npm run start:prod
fi


#!/bin/bash

set -e

cd /app

rm -rf ./dist
echo "Run Build"
tsc -p ./src/tsconfig.prebuild.json

echo "Prepare test"
COMMAND=true node ./dist/AppModule/main.js prepare-tests

echo "Run build with tests"
tsc -p ./src/tsconfig.posbuild.json

if [ "${RUN_WATCH}" == "WATCH" ]; then
    echo "Start test watch"
    ENVIRONMENT=testing tsc-watch -p ./src/tsconfig.posbuild.json --onSuccess "node ./dist/AppModule/test.run.js"
else
    echo "Start tests"
    ENVIRONMENT=testing node ./dist/AppModule/test.run.js
fi



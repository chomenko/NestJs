#!/bin/bash
set -e

TEST_MYSQL_DATABASE="${MYSQL_DATABASE}_test"

MYSQL () {
  mysql -h ${MYSQL_HOST_FOR_APP} -u root -p${MYSQL_ROOT_PASSWORD} "$@"
}

RETRIES=240
until MYSQL -e "use information_schema" > /dev/null 2>&1 || [ $RETRIES -eq 0 ]; do
  echo "----> Waiting for initialize database host ${MYSQL_HOST_FOR_APP}. ${RETRIES}."
  RETRIES=`expr $RETRIES - 1`
  sleep 1
done

echo "----> Database initialized."

RESULT=`MYSQL -e "SHOW DATABASES" | grep -v Wildcard | grep -o ${MYSQL_DATABASE} || echo "nop"`
if [ "$RESULT" = "${MYSQL_DATABASE}" ]; then
  echo "Database ${MYSQL_DATABASE} exist"
else
  echo "Create database ${MYSQL_DATABASE}"
  MYSQL -e "CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE};";
fi

RESULT_VARIABLE=`MYSQL -e "SELECT EXISTS (SELECT 1 FROM mysql.user WHERE user = '$MYSQL_USER');"`
if [ ! "$RESULT_VARIABLE" = 1 ]; then
  MYSQL -e "CREATE USER IF NOT EXISTS '${MYSQL_USER}'@'%' IDENTIFIED BY '${MYSQL_PASSWORD}';"
  MYSQL -e "GRANT ALL PRIVILEGES ON ${MYSQL_DATABASE}.* TO '${MYSQL_USER}'@'%';"
fi

if [ "${ENVIRONMENT}" = "development" ]; then
  RESULT=`MYSQL -e "SHOW DATABASES" | grep -v Wildcard | grep -o ${TEST_MYSQL_DATABASE} || echo "nop"`
  if [ "$RESULT" = "${TEST_MYSQL_DATABASE}" ]; then
    echo "Database ${TEST_MYSQL_DATABASE} exist"
  else
    echo "Create database ${TEST_MYSQL_DATABASE}"
    MYSQL -e "CREATE DATABASE IF NOT EXISTS ${TEST_MYSQL_DATABASE};";
  fi
   MYSQL -e "GRANT ALL PRIVILEGES ON ${TEST_MYSQL_DATABASE}.* TO '${MYSQL_USER}'@'%';"
else
  echo "Skip create ${TEST_MYSQL_DATABASE} database"
fi
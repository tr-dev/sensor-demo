FROM mysql:8
EXPOSE 3306
ENV MYSQL_ROOT_PASSWORD="password"
COPY sensors.sql /docker-entrypoint-initdb.d

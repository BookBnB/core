FROM node:12.19.0-alpine3.12
COPY . /app
WORKDIR /app
RUN mv /app/build/src/* /app/build && \
    rmdir /app/build/src && \
    npm install --only=prod && \
    echo "ROOT_DIR=./build" >> .env && \
    echo "TYPEORM_URL=\$DATABASE_URL" >> .env && \
    echo "TYPEORM_MIGRATIONS=\$ROOT_DIR/infra/migration/*.js" >> .env && \
    echo "TYPEORM_MIGRATIONS_DIR=\$ROOT_DIR/infra/migration" >> .env && \
    echo "USERS_OPENAPI_SPEC_URL=\$USERS_SERVICE_URL/v1/api.json" >> .env && \
    echo "PAYMENTS_OPENAPI_SPEC_URL=\$PAYMENTS/v1/api.json" >> .env
CMD npm start

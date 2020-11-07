#!/bin/sh
docker run -w /app node:12.19.0-alpine3.12 -v ./:/app npm install && npm run build
docker build . -f docker/Dockerfile -t bookbnb

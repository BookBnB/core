#!/bin/sh
docker run -v $(pwd):/app -w /app node:12.19.0-alpine3.12 npm install && npm run build
docker build/src . -f docker/Dockerfile -t bookbnb

#!/bin/bash
docker/build_production_image.sh
docker tag bookbnb:latest $IMAGE_NAME:$IMAGE_VERSION
echo "$REGISTRY_PASSWORD" | docker login $REGISTRY_URL -u $REGISTRY_USERNAME --password-stdin
docker push $IMAGE_NAME:$IMAGE_VERSION
docker push $IMAGE_NAME:latest

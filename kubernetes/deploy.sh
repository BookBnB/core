#!/bin/bash
docker pull $IMAGE_NAME:$IMAGE_VERSION
kubectl -n $KUBE_NAMESPACE set image deployment/bookbnb-core bookbnb-core=$IMAGE_NAME:$IMAGE_VERSION

#!/bin/bash
kubectl -n $KUBE_NAMESPACE apply -f kubernetes/configmap.yaml
kubectl -n $KUBE_NAMESPACE set image deployment/bookbnb-core bookbnb-core=$IMAGE_NAME:$IMAGE_VERSION

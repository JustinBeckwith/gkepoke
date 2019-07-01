#!/bin/bash
TAG=$(date +%s)
kubectl delete deployments/poke
kubectl delete pods/poke
docker build -t gcr.io/el-gato/poke:TAG .
docker push gcr.io/el-gato/poke:TAG
kubectl run poke --image gcr.io/el-gato/poke:TAG --restart Never

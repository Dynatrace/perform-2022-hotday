#!/bin/bash

RESPONSE=$(curl -X POST "$DT_TENANT/api/config/v1/anomalyDetection/metricEvents" -H "accept: application/json; charset=utf-8" -H "Authorization: Api-Token $DT_API_TOKEN" -H "Content-Type: application/json; charset=utf-8" -d @./oomkill-custom-event.json)

echo -e "$RESPONSE"

sleep 10

kubectl apply -f newbuild-quota.yml
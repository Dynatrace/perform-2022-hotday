## Logs

In this module, we'll:
- Ingest logs using Log Ingestion API 
- Pin Log Query to dashboard
- Create Log Metric
- Create Log Event  

#### Log Ingest API
The Log Ingestion API allows for you to push custom logs into Dynatrace. 
The log Ingest API is currently accessible through an Active Gate if you are working with a managed tenant.

If you are using the saas the log ingest api is accessible in Early Adopter directly from your Tenant API endpoint.

1. Install/Deploy an ActiveGate

>Navigate to the Dynatrace HUB
> - Using the Dynatrace Menu -> Manage -> HUB
> - Search for and click on `ActiveGate`
![log_ag_install](../../assets/images/log_ag_install.png)

we are currntly using a Saas tenant having the early adopter feature enabled.
So we could interact with our log ingest API directly from curl or from the API explorer.

2. POST Ingest Logs

Dynatrace will index the logs on dimensions 

> - Replace APITOKEN with the value of you API TOKEN
> - NODENAME dt.kubernetes.node.name 
> - NODE_ID dt.kubernetes.node.system_uuid 
> - CLUSTERID  dt.kubernetes.cluster.id 
> - NAMESPACEID  k8s.namespace.uid 
> - NAMESPACENAME  k8s.namespace.name 
> - PODNAME k8s.pod.name 
> - PODID k8s.pod.uid 

To get this value from our environment  :
```
CLUSTERID=$(kubectl get namespace kube-system -o jsonpath='{.metadata.uid}')
DTNODEID=$(kubectl get nodes -o jsonpath='{.items[1].status.nodeInfo.systemUUID}')
NODENAME=$(kubectl get nodes -o jsonpath='{.items[1].metadata.name}')
NAMESPACEID=$(kubectl get ns -o jsonpath='{.items[1].metadata.uid}')
NAMESPACENAME=$(kubectl get ns -o jsonpath='{.items[1].metadata.name}')
PODNAME=$(kubectl get pods -n $NAMESPACENAME -o jsonpath='{.items[1].metadata.name}')
PODID=$(kubectl get pods -n $NAMESPACENAME -o jsonpath='{.items[1].metadata.uid}')
```

```
curl -X POST -H " https://{your-environment-hostname}/api/v2/logs/search" -H "accept: application/json; charset=utf-8" -H "Authorization: Api-Token <APITOKEN>" -H "Content-Type: application/json; charset=utf-8" -d "[{\"content\":\"example log content 1\",\"status\":\"error\",\"log.source\":\"/var/log/syslog\",\"dt.kubernetes.node.name\":\"<NODENAME>\",\"dt.kubernetes.node.system_uuid\":\"<DTNODEID>\",\"dt.kubernetes.cluster.id\":\"<CLUSTERID>\",\"k8s.namespace.uid\":\"<NAMESPACEID>\",\"k8s.namespace.name\":\"<NAMESPACENAME>\",\"k8s.pod.name\":\"<PODNAME>\",\"k8s.pod.uid\":\"<PODID>\",\"response\":12},{\"content\":\"example log content 2\",\"status\":\"info\",\"log.source\":\"/var/log/syslog\",\"dt.kubernetes.node.name\":\"<NODENAME>\",\"dt.kubernetes.node.system_uuid\":\"<DTNODEID>\",\"dt.kubernetes.cluster.id\":\"<CLUSTERID>\",\"k8s.namespace.uid\":\"<NAMESPACEID>\",\"k8s.namespace.name\":\"<NAMESPACENAME>\",\"k8s.pod.name\":\"<PODNAME>\",\"k8s.pod.uid\":\"<PODID>\",\"response\":1}]"
```
with the following payload
```json

[
    {
    "content": "example log content 1",
    "status" : "error",
    "log.source": "/var/log/syslog",
    "dt.kubernetes.node.name" : "<NODENAME>",
    "dt.kubernetes.node.system_uuid" : "<DTNODEID>",
    "dt.kubernetes.cluster.id" : "<CLUSTERID>",
    "k8s.namespace.uid" : "<NAMESPACEID>",
    "k8s.namespace.name" : "<NAMESPACENAME>",
    "k8s.pod.name": "<PODNAME>",
    "k8s.pod.uid" : "<PODID>",
    "response":12
  },
  {
    "content": "example log content 2",
    "status" : "info",
    "log.source": "/var/log/syslog",
    "dt.kubernetes.node.name" : "<NODENAME>",
    "dt.kubernetes.node.system_uuid" : "<DTNODEID>",
    "dt.kubernetes.cluster.id" : "<CLUSTERID>",
    "k8s.namespace.uid" : "<NAMESPACEID>",
    "k8s.namespace.name" : "<NAMESPACENAME>",
    "k8s.pod.name": "<PODNAME>",
    "k8s.pod.uid" : "<PODID>",
     "response":1
  }
]

```
### Create a metric out of a logs


### Analyze and Alert

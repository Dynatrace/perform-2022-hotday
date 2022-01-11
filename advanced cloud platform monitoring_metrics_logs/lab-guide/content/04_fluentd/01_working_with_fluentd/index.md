## Working with Fluentd

In this module we'll learn about Fluentd and how to do the following:

###What is Fluentd?
An open-source log collector to unify logging layer.

Key Features:
- Stores and structures data in JSON
- Pluggable Architecture allows for easily extending functionality
- Built-in Reliability


Learning these concepts will help your teams transform terabytes of logs into AI-powered answers and additional context for apps and infrastructure, at scale. 


#### Objective
The metric exposed by Nginx ingress controller is not providing the right dimensions to understand precisely how the traffic is splitted between the several services of our cluster.
Let's utilize logs to expose the right dimensions.

### Adjust the logging format of Nginx

Nginx produce a standard logging format :
`
127.0.0.1 - - [10/Oct/2020:15:10:20 -0600] "HEAD / HTTP/1.1" 200 0 "<https://example.com>" "Mozilla/5.0..."
`
The logging format of nginx is structure with the help of nginx variables :
`
$remote_addr - $remote_user [$time_local] "$request" $status $body_bytes_sent "$http_referer" "$http_user_agent"
`
THe logging format of Nginx could be adjusted by modifying the nginx configuration file.
In kubernetes the configuration file is stored in a Config Map.
In our cluster the nginx config map is called: `nginx-config`

To add extra information in the nginx log files add structure the logs by adding extra metadata :
* service name
* namespace of the ingress
* name of the ingress
* response time
* proxy host
* ...etc

IN the cluster the Nginx has already been configured to produce the logs with our extra metadata :
 ```
log-format:
----
$remote_addr [$time_local] $request $status $body_bytes_sent $request_time $upstream_addr $upstream_response_time $proxy_host  $upstream_status $resource_name $resource_type $resource_namespace $service
 ```

To validate the configuration let's describe the config map 

### Create a log stream pipeline extracting the metadata 
#### Collect logs from nginx
To collect logs from files, fluentd has an input plugin `tail`
Because dynatrace is already ingesting logs in our cluster ( except for the namespace nondynatrace), let's collect logs only from the nginx pods:
 ```
<source>
    @type tail
    path /var/log/containers/*nginx*.log
    pos_file /var/log/fluentd.pos
    time_format %Y-%m-%dT%H:%M:%S.%NZ
    tag nginx
</source>
 ```
path /var/log/containers/*nginx*.log will only collect logs from containers having nginx in the pod name
```
<source>
    @type tail
    path /var/log/containers/*nginx*.log
    pos_file /var/log/fluentd.pos
    time_format %Y-%m-%dT%H:%M:%S.%NZ
    tag nginx
</source>
<match nginx>
 @type stdout
</match>
```

To visualize the collected logs you can use the fluentd output plugin `Stdout` that will expose the transormed logs in the fluentd container log.

#### Parse the nginx logs
Once the logs collected, we want to extract the metadata to create new fluentd "keys"
Fluentd has parser plugins that will help us to extract the data.
The parser plugin that we will use is `nginx`
the Nginx parser plugin is able to automatically extract the metadata of the standard logging format.

Because of the customized logging format we will need to use `expression` to explain how to parse our logging format.
```
<parse>
    @type nginx
    key_name log
    reserve_data yes
    expression  /^(?<logtime>\S+)\s+(?<logtype>\S+)\s+(?<type>\w+)\s+(?<ip>\S+)\s+\[(?<time_local>[^\]]*)\]\s+(?<method>\S+)\s+(?<request>\S+)\s+(?<httpversion>\S*)\s+(?<status>\S*)\s+(?<bytes_sent>\S*)\s+(?<responsetime>\S*)\s+(?<proxy>\S*)\s+(?<upstream_responsetime>\S*)\s+(?<ressourcename>\S*)\s+(?<upstream_status>\S*)\s+(?<ingress_name>\S*)\s+(?<ressource_type>\S*)\s+(?<ressource_namesapce>\S*)\s+(?<service>\w*)/
    time_format %d/%b/%Y:%H:%M:%S %z
</parse>
```

To be able to extract log from the tail plugin, we need to add the parser within the input plugin `tail`
```
<source>
    @type tail
    path /var/log/containers/*nginx*.log
    pos_file /var/log/fluentd.pos
    time_format %Y-%m-%dT%H:%M:%S.%NZ
    tag nginx
    <parse>
        @type nginx
        key_name log
        reserve_data yes
        expression  /^(?<logtime>\S+)\s+(?<logtype>\S+)\s+(?<type>\w+)\s+(?<ip>\S+)\s+\[(?<time_local>[^\]]*)\]\s+(?<method>\S+)\s+(?<request>\S+)\s+(?<httpversion>\S*)\s+(?<status>\S*)\s+(?<bytes_sent>\S*)\s+(?<responsetime>\S*)\s+(?<proxy>\S*)\s+(?<upstream_responsetime>\S*)\s+(?<ressourcename>\S*)\s+(?<upstream_status>\S*)\s+(?<ingress_name>\S*)\s+(?<ressource_type>\S*)\s+(?<ressource_namesapce>\S*)\s+(?<service>\w*)/
    </parse>
    read_from_head true
    keep_time_key true
</source>
```

To Generate metrics out of the extracted metadata, we need to define the type of each new Fluentd keys.

the operator `types` allow us to define for each key the type .
for example :
```
types keyname1:type,keyname2:type..
```
The fluentd Data type :
* string
* integer
* float
* time
* size 
* bool
* ....

From the current log stream pipeline add the `types` operator to define types to the various keys
```
kubectl get cm -n nondynatrace
kubectl edit cm fluentd-conf
```
To utilize our new log stream pipeline we need to delete the fluentd pods
```
kubectl delete pods -n nondynatrace -l app=fluentd-pipeline
```
We need to look at the produced logs of our log stream pipeline on the pod collecting the logs of the Nginx ingress
We need to select the fluentd pod running to the same node as Nginx ingress controller
The following command will list all pods and precise which node is hosting the pod :
```
kubectl get pod -o=custom-columns=NODE:.spec.nodeName,NAME:.metadata.name --all-namespaces
```

Once you have the fluentd pod name you can then show the generated logs of this pod with :
```
kubectl logs $FLUENTID_PODNAME -n nondynatrace -f
```

To see new logs coming in Fluentd , we need to generate traffic,
```
/hotday_script/load/generateTraffic.sh
```
#### Collect the request time as the logstream time

fluentd parser plugin can also precise which key contains the date with `time_key`
Let's modify our current fluentd pipeline by adding after the `types` operator : 
```
time_key time_local
time_format %d/%b/%Y:%H:%M:%S %z
```

#### Define a Prometheus output plugin

Fluentd has a Prometheus plugin that is able to :
* create a prometheus exporter on the fluentd agent
* expose statistics related to the log stream pipeline
* expose custom metrics

To define the exporter we need to use another `source` :
```
<source>
 @type prometheus
 bind 0.0.0.0
 port 9914
 metrics_path /metrics
</source>
```
#### Expose metrics extracted from our Nginx logs

To expose metrics we need to define the metric using `metric`
A metric requires several properties :
* name
* description
* type : counter, gauge, histogram, summary
* the key ( optional)
for example :
```
<metric>
    name byte_sent
    type gauge
    desc byte sent
    key bytes_sent
</metric>
```
Exposing metric is good, but we need to right dimensions to be able to visualize properly our traffic  splitted by services, ingress...etc
The prometheus plugins has the option to create labels for our metric.
We can either define the label :
* inside the metric object : for a specific label related to that metric
* outside the metric object :  for common labels for all the metric defined in our pipeline
example:
```
<filter  nginx>
 @type prometheus
 <labels>
   method ${method}
   request ${request}
   status ${status}
   namespace ${ressource_namesapce}
   service ${service}
   ressourcename ${ressourcename}
 </labels>
 <metric>
   name hotday_response_time
   type gauge
   desc responset time
   key responsetime
 </metric>
</filter>
```
Now let's update our fluentd pipeline by exposing :
* response time
* byte sent
* count the logs stream ( number of request/s)
``` 
kubectl edit cm fluentd-conf
```

To test your update don't forget to :
* delete the fluentd pods
* display the logs of the fluentd ingeting the logs of the nginx ingress controller
* generate some http traffic

### Create a service with dynatrace Prometheus annotation to ingest the generated metrics

Similar to the previous exercice related to Prometheus metrics.
Update the following file by updating the port of the fluentd exporter :
`/home/$BASTION_USER/hotday_script/prometheusservice_fluentd_metric.yaml`

once modified create the new service with the following command :
```
kubectl apply -f /home/$BASTION_USER/hotday_script/prometheusservice_fluentd_metric.yaml -n nondynatrace
```  

### Create a graph utilizing the new nginx metrics
#### generate traffic
To be able to ingest metrics we need to generate traffic in the background.
Use the script :

```
/hotday_script/load/generateTraffic.sh
```

#### Create a Graph showing the 90th percentile of the response time splitted by service

Go to the Data Explorer and search for the new metric: `hotday_response_time`

Create a graph with :
* aggregator : Percentile 90th
* Split by : service
  
![Response time graph](../../assets/images/dt_fluentd_metrics.png)

#### Create a Pie raph showing the status code per services

Go to the Data Explorer and search for the new metric: `hotday_requests`

Create a graph with :
* aggregator : Count
* Split by : status,service
  
![Pie chart](../../assets/images/dtu_fluentd_metrics_status.png)

## Logs: Integrating Fluentd and Dynatrace

In this module we'll learn how to integrate Dynatrace with Fluentd in Kubernetes.

### What's in it for Me?
Learning these concepts will help your teams transform terabytes of logs into AI-powered answers and additional context for apps and infrastructure, at scale. 

We will update our previous log stream pipeline to forward the generated log to dynatrace

### Objective
This exercise will :
* modify our current fluentd pipeline
* utilize the log v2 viewer
* create a dynatrace metric out of logs

### 1. Let's update the log stream by restructuring the log stream

Fluentd has a output plugin dynatrace that will forward the generated log to the logs ingest API.
The log ingest API requires a specific format :
 ```
{
"content": "example log content 1",
"status" : "error",
"log.source": "/var/log/syslog",
"dt.entity.host" : "<HOST ID>",
"dt.entity.process_group_instance": "<PG_ID>"
"response":12
}
 ```
* The property content will have the value of our log.
* status is optionnal but helps to filter our content
* log.source is also optional
We can add as many extra properties to attach extra labels related to our log stream.
Several labels will be used to index the log stream to a given Dynatrace entity.
  
#### how to restructure our logs 

Fluentd has a plugin that will helps us to restructure the produced log stream : `record_transformer`
 ```
@type record_transformer
enable_ruby true
<record>
content ${record["method"]} ${record["request"]} ${record["status"]} ${record["service"]} ${record["bytes_sent"]} ${record["responsetime"]} ${record["service"]}
</record>
 ```
<record></record> will help us to re structure our log stream before sending it to dynatrace.

In the record object you can add as many new labels
 ```
<record>
labelname value
</record>
 ```
record can retrieve the value of existing fluentd keys with :
 ```
${record["keyname"]}
 ```
To fully index a log stream to a Pod, node, k8s cluster it is required to add the following labels :
* `dt.kubernetes.node.name`
* `dt.kubernetes.node.system_uuid` 
* `k8s.pod.labels`
* `dt.kubernetes.cluster.id` 
* `k8s.namespace.uid`
* `k8s.namespace.name`
* `k8s.pod.name` 
* `k8s.pod.uid` 

if you log stream does not have the details limit to the available information
you can easily retrieve the to fields with :
 ```
dt.kubernetes.cluster.id "#{ENV['CLUSTER_ID']}"
dt.kubernetes.node.system_uuid ${File.read("/sys/devices/virtual/dmi/id/product_uuid").strip}
 ```
#### remove log streams that are not related to http traffic going through the ingress

Every request coming in our ingress are normally made to be routed to a specific service.
Nginx could also log k8s health, live checks that won't mach any of our back-end rule.
Therefore, to avoid pushing non-meaningful or non structured data, we should filter http request that won't route ( without ingress name, service, ...etc)

Fluentd has a filter plugin `grep` that will help us to exclude data.
 ```
<filter nginx>
    @type grep
    <exclude>
           
    </exclude>
</filter>
 ```
the exclusion rules requires specifying with log stream we want to apply a grep patter :
 ```
<filter nginx>
    @type grep
    <exclude>
          key log_streamkey
          pattern /regexp/
    </exclude>
</filter>
 ```
in our example we would like to filter the logs stream where the key service is empty

The regexp excluding empty string is : `/^$/`

Modify the logstream pipeline by adding the filter that will exclude log stream having an empty service

#### Add the record transformer to your logstream 
![stdout log stream transformed](../../assets/images/dt_fluentd_record_transformer.png)

### Add the dynatrace output plugin

the fluentd container deployed in the cluster has already the dynatrace plugin installed.
The fluentd plugin is opensource and documented [here](https://github.com/dynatrace-oss/fluent-plugin-dynatrace)

The plugin will have specific propeties to define :
* the url of your activegate
* the api_token ( having the log ingest right)
 ```
<match nginx>
    @type              dynatrace
    active_gate_url "#{ENV['AG_INGEST_URL']}"
    api_token "#{ENV['LOG_INGEST_TOKEN']}"
    ssl_verify_none    true
</match>
 ```
Remove the match using the stdout plugin and replace it with dynatrace plugin ( code above)

Run the load test scripts to get logs generated and let fluentd collect the new logs 

### Log viewer
All the ingested logs from the dynatrace Operator and from fluentd will be available in the Log viewer.
Click on the left menu Observe and Explore/Logs
![Log viewer_view](../../assets/images/dt_fluentd_logviewer.png)

#### Filter the logs to see our logs
To create a metric out of a log stream requires to create the right log filter.
Look a the log properties of fluentd, and create the filter that will only show logs related to our application.
![Log viewer_filter](../../assets/images/dt_fluentd_log_detail.png)

#### Create a metric out of our logs
Create a metric exposing the label `responsetime` time ingested by dynatrace
![Log viewer_create_metric](../../assets/images/dt_fluentd_log_detail.png)

#### Create traffic to generate new logs

THe metric only exists from the moment new log stream has been ingested by dynatrace.
Let's run the load test script to have new logs ingested by dynatrace.
```
/hotday_script/load/generateTraffic.sh
```
Once the metric exist go to the Data explorer and create a new Graph with your metric.

## Logs: Integrating Fluentd and Dynatrace

In this module we'll learn how to integrate Dynatrace with Fluentd in Kubernetes.

### What's in it for Me?

Learning these concepts will help your teams transform terabytes of logs into AI-powered answers and additional context for apps and infrastructure, at scale.

We will update our previous log stream pipeline to forward the generated log to dynatrace

### Objective

This exercise will :

- modify our current fluentd pipeline
- utilize the log v2 viewer
- create a dynatrace metric out of logs

#### Restructuring the log stream

Fluentd has a output plugin dynatrace that will forward the generated log to the logs ingest API.
The log ingest API requires a specific format :

```bash
{
"content": "example log content 1",
"status" : "error",
"k8s.pod.name":"$PODNAME",
"k8s.namespace.uid":"$NAMESPACEID",
"dt.kubernetes.node.name":"$NODENAME",
"dt.kubernetes.cluster.id":"$CLUSTERID",
"dt.kubernetes.node.system_uuid":"$DTNODEID",
"log.source": "/var/log/syslog",
"dt.entity.host" : "<HOST ID>",
"dt.entity.process_group_instance": "<PG_ID>"
"response":12
}
 ```

- The property content will have the value of our log.
- Status is optional but helps to filter our content.
- Log.source is also optional.
- The other labels are there to help dynatrace to index the log stream to the right entity.

We can add as many extra properties to attach extra labels related to our log stream.
Several labels will be used to index the log stream to a given Dynatrace entity.
  
#### How to restructure our logs

Fluentd has a plugin that will helps us to restructure the produced log stream : `record_transformer`

 ```bash
@type record_transformer
enable_ruby true
<record>
content ${record["method"]} ${record["request"]} ${record["status"]} ${record["service"]} ${record["bytes_sent"]} ${record["responsetime"]} ${record["service"]}
</record>
 ```

`<record></record>` will help us to re structure our log stream before sending it to dynatrace.

In the record object you can add any number of labels.

```bash
<record>
labelname value
</record>
 ```

record can retrieve the value of existing fluentd keys with :

```bash
${record["keyname"]}
 ```

To fully index a log stream to a Pod, node, k8s cluster it is required to add the following labels :

- `dt.kubernetes.node.name`
- `dt.kubernetes.node.system_uuid`
- `k8s.pod.labels`
- `dt.kubernetes.cluster.id`
- `k8s.namespace.uid`
- `k8s.namespace.name`
- `k8s.pod.name`
- `k8s.pod.uid`

To add this filter, edit your fluentd config map:

```bash
kubectl edit cm fluentd-conf -n nondynatrace
```

Below your super awesome nginx filter with the labels and defined metrics, add this section:

```bash
     <filter nginx>
       @type record_transformer
       enable_ruby true
       <record>
         status ${ record.dig(:log, :severity) || record.dig(:log, :level) || (record["log"] =~ /\W?\berror\b\W?/i ? "ERROR" : (record["log"] =~ /\W?\bwarn\b\W?/i ? "WARN" : (record["log"] =~ /\W?\bdebug\b\W?/i ? "DEBUG" : (record["log"] =~ /\W?\binfo\b\W?/i ? "INFO" : "NONE")))) }
         content ${record["method"]} ${record["request"]} ${record["status"]} ${record["service"]} ${record["bytes_sent"]} ${record["responsetime"]} ${record["service"]}
         dt.kubernetes.node.system_uuid ${File.read("/sys/devices/virtual/dmi/id/product_uuid").strip}
         dt.kubernetes.cluster.id "#{ENV['CLUSTER_ID']}"
         k8s.namespace.name ${record["resource_namespace"]}
         k8s.service.name ${record["service"]}
       </record>
       remove_keys  nginx
     </filter>
```

- The status line looks like a lot!  But it simply uses an `or` ( || ) command to normalize the status into one of error/warn/debug/info.
- The content line combines several fields that we want to export into a single "packet" of data.
- The remaining fields are split out individuals because they are used individually by Dynatrace to index and dimension data.

Incidentally, if your log stream does not have the details limit to the available information you can easily retrieve the to fields with :

```bash
dt.kubernetes.cluster.id "#{ENV['CLUSTER_ID']}"
dt.kubernetes.node.system_uuid ${File.read("/sys/devices/virtual/dmi/id/product_uuid").strip}
 ```

![Checkpoint!](../../assets/images/cp.png)

Please take a moment to mark the spreadsheet *fluentd - Restructued Logs* column for your row with `done`.

#### remove log streams that are not related to http traffic going through the ingress

Every request coming in our ingress are normally made to be routed to a specific service.
Nginx could also log k8s health, live checks that won't mach any of our back-end rule.
Therefore, to avoid pushing non-meaningful or non structured data, we should filter http request that won't route ( without ingress name, service, ...etc)

Fluentd has a filter plugin `grep` that will help us to exclude data.

```bash
<filter nginx>
    @type grep
    <exclude>
           
    </exclude>
</filter>
```

The exclusion rules requires specifying with log stream we want to apply a grep pattern :

```bash
<filter nginx>
    @type grep
    <exclude>
          key log_streamkey
          pattern /regexp/
    </exclude>
</filter>
```

In our example we would like to filter the logs stream where the key service is empty.

The regexp excluding empty string is : `/^$/`

Modify the logstream pipeline by adding the filter that will exclude log stream having an empty service right above your `record transformer filter`:

```bash
     <filter nginx>
        @type grep
          <exclude>
          key service
          pattern /^$/
          </exclude>
     </filter>

     <filter nginx> (following filter already there- do not add!)
```

#### Add the record transformer to your logstream

![fluentd_2_1](../../assets/images/dt_fluentd_record_transformer.png)

#### Add the dynatrace output plugin

Now that we're done building our environment we want to stop exporting everything to stdout and send it to Dynatrace instead.
The fluentd container deployed in the cluster has already the dynatrace plugin installed.
The fluentd plugin is opensource and documented [here](https://github.com/dynatrace-oss/fluent-plugin-dynatrace)

The plugin will have specific propeties to define :

- the url of your activegate-
- the api_token ( having the log ingest right)

```bash
<match nginx>
    @type              dynatrace
    active_gate_url "#{ENV['AG_INGEST_URL']}"
    api_token "#{ENV['LOG_INGEST_TOKEN']}"
    ssl_verify_none    true
</match>
```

Remove the match using the stdout plugin and replace it with dynatrace plugin (code above).

Remember to reset your fluentd pods:

```bash
kubectl delete pods -n nondynatrace -l app=fluentd-pipeline
```

If your load generator script stopped, start it up again in another terminal:

```bash
~/hotday_script/load/generateTraffic.sh
```

![Checkpoint!](../../assets/images/cp.png)

Please take a moment to mark the spreadsheet *fluentd - switched to Dynatrace plugin* column for your row with `done`.

### Log viewer

All the ingested logs from the dynatrace Operator and from fluentd will be available in the Log viewer.
Click on the left menu Observe and Explore/Logs
![fluentd_2_2](../../assets/images/dt_fluentd_logviewer.png)

#### Filter the logs to see our logs

To create a metric out of a log stream requires to create the right log filter.
Look a the log properties of fluentd, and create the filter that will only show logs related to our application.
![fluentd_2_3](../../assets/images/dt_fluentd_log_detail.png)

#### Create a metric out of our logs

Create a metric exposing the label `responsetime` time ingested by dynatrace
![fluentd_2_4](../../assets/images/dt_fluentd_log_create_metric.png)

#### Create traffic to generate new logs

The metric only exists from the moment new log stream has been ingested by dynatrace.
Confirm that you are generating traffic or restart it with:

```bash
/hotday_script/load/generateTraffic.sh
```

Once the metric exist go to the Data explorer and create a new Graph with your metric.

![Checkpoint!](../../assets/images/cp.png)

Please take a moment to mark the spreadsheet *fluentd - Created Log Graph* column for your row with `done`.

### For Reference

The completed fluentd-conf map can be deployed via:

```bash
kubectl apply -f ~/hotday_script/fluentd/fluentd-configmap-dynatrace.yaml
```

Here is the full config map for fluentd-conf:

```bash
apiVersion: v1
kind: ConfigMap
metadata:
  name: fluentd-conf
  namespace: nondynatrace
  labels:
    app: fluentd
    component: fluentd-conf
data:
  CLUSTER_ID: "CLUSTER_ID_TO_REPLACE"
  AG_INGEST_URL: "https://fluentd-activegate:9999/e/ENVIRONMENT_ID_TO_REPLACE/api/v2/logs/ingest"
  fluent.conf: |-
    # Ingest logs from nodes
     <match fluent.**>
      @type null
     </match>
     <source>
       @type tail
       path /var/log/containers/*nginx*.log
       pos_file /var/log/fluentd.pos
       time_format %Y-%m-%dT%H:%M:%S.%NZ
       read_from_head true
       tag nginx
       keep_time_key true
     <parse>
       @type nginx
       reserve_data yes
       expression  /^(?<ip>\S+)\s+\[(?<time_local>[^\]]*)\]\s+(?<method>\S+)\s+(?<request>\S+)\s+(?<httpversion>\S*)\s+(?<status>\S*)\s+(?<bytes_sent>\S*)\s+(?<responsetime>\S*)\s+(?<proxy>\S*)\s+(?<upstream_responsetime>\S*)\s+(?<resourcename>\S*)\s+(?<upstream_status>\S*)\s+(?<ingress_name>\S*)\s+(?<resource_type>\S*)\s+(?<resource_namespace>\S*)\s+(?<service>\w*)/
       types ip:string,time_local:string,method:string,request:string,httpversion:string,status:string,bytes_sent:integer,responsetime:float,proxy:string,upstream_responsetime:integer,resourcename:string,upstream_status:string,ingress_name:string,resource_type:string,resource_namespace:string,service:string
       time_key time_local
       time_format %d/%b/%Y:%H:%M:%S %z
     </parse>
     </source>
     <source>
       @type prometheus
       bind 0.0.0.0
       port 9914
       metrics_path /metrics
     </source>
     <filter nginx>
       @type kubernetes_metadata
     </filter>
     <filter  nginx>
      @type prometheus
       <labels>
         method ${method}
         request ${request}
         status ${status}
         namespace ${resource_namespace}
         service ${service}
         ressourcename ${resourcename}
       </labels>
       <metric>
         name hotday_response_time
         type gauge
         desc response time
         key responsetime
       </metric>
       <metric>
         name hotday_byte_sent
         type gauge
         desc byte sent
         key bytes_sent
       </metric>
       <metric>
         name hotday_requests
         type counter
         desc The total number of request
       </metric>
       <metric>
         name hotday_status
         type counter
         desc status code
         key status
       </metric>
     </filter>
     <filter nginx>
        @type grep
          <exclude>
          key service
          pattern /^$/
          # or, to exclude all messages that are empty or include only white-space:
          </exclude>
     </filter>
     <filter nginx>
       @type record_transformer
       enable_ruby true
       <record>
         status ${ record.dig(:log, :severity) || record.dig(:log, :level) || (record["log"] =~ /\W?\berror\b\W?/i ? "ERROR" : (record["log"] =~ /\W?\bwarn\b\W?/i ? "WARN" : (record["log"] =~ /\W?\bdebug\b\W?/i ? "DEBUG" : (record["log"] =~ /\W?\binfo\b\W?/i ? "INFO" : "NONE")))) }
         content ${record["method"]} ${record["request"]} ${record["status"]} ${record["service"]} ${record["bytes_sent"]} ${record["responsetime"]} ${record["service"]}
         dt.kubernetes.node.system_uuid ${File.read("/sys/devices/virtual/dmi/id/product_uuid").strip}
         dt.kubernetes.cluster.id "#{ENV['CLUSTER_ID']}"
         k8s.namespace.name ${record["resource_namespace"]}
         k8s.service.name ${record["service"]}
       </record>
       remove_keys  nginx
     </filter>
     <match nginx>
       @type              dynatrace
       active_gate_url "#{ENV['AG_INGEST_URL']}"
       api_token "#{ENV['LOG_INGEST_TOKEN']}"
       ssl_verify_none    true
     </match>
```

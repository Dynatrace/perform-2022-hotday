## What is Fluentd?

An open-source log collector to unify logging layer.
Key Features:

- Stores and structures data in JSON
- Pluggable Architecture allows for easily extending functionality
- Built-in Reliability

### Working with Fluentd

In this module we'll:

- learn more about Fluentd
- update Fluentd to output metrics
- ingest these metrics with Dynatrace
- improve the log output further to trim away blank lines and format metrics

Learning these concepts will help your teams transform terabytes of logs into AI-powered answers and additional context for apps and infrastructure at any scale.

### The scenario

The metrics exposed by our Nginx ingress controller are not providing the right dimensions to understand precisely how the traffic is split between the several services of our cluster.
We need to ingest the Nginx logs to see the full picture.

#### What we are going to do in the lab

Nginx produces a standard logging format :

```bash
127.0.0.1 - - [10/Oct/2020:15:10:20 -0600] "HEAD / HTTP/1.1" 200 0 "<https://example.com>" "Mozilla/5.0..."
```

The logging format of nginx is structure with the help of nginx variables :

``` bash
$remote_addr - $remote_user [$time_local] "$request" $status $body_bytes_sent "$http_referer" "$http_user_agent"
```

- The logging format of Nginx could be adjusted by modifying the nginx configuration file.
- In kubernetes the configuration file is stored in a Config Map.
- In our cluster the nginx config map is called: `nginx-config`

To add extra information in the nginx log files add structure the logs by adding extra metadata :

- service name
- namespace of the ingress
- name of the ingress
- response time
- proxy host
- ...etc

Nginx has already been configured to produce the logs with our extra metadata :

 ``` bash
log-format:
----
$remote_addr [$time_local] $request $status $body_bytes_sent $request_time $upstream_addr $upstream_response_time $proxy_host  $upstream_status $resource_name $resource_type $resource_namespace $service
 ```

#### Check out what is already in place

Open the Fluentd config map:

``` bash
kubectl edit cm fluentd-conf -n nondynatrace
```

Scroll a bit if necessary to find the starting `<source>` entries.  See below for key details.

``` bash
...
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
        expression  /^(?<ip>\S+)\s+\[(?<time_local>[^\]]*)\]\s+(?<method>\S+)\s+(?<request>\S+)\s+(?<httpversion>\S*)\s+(?<status>\S*)\s+(?<bytes_sent>\S*)\s+(?<responsetime>>

      </parse>
      read_from_head true
      keep_time_key true
    </source>

<match nginx>
 @type stdout
</match>
...
```

- `path /var/log/containers/*nginx*.log` will only collect logs from containers having nginx in the pod name. Dynatrace natively ingests other logs on the system so we want to limit fluentd capture to only nginx.
- `tail` is the fluentd plugin type that will follow the logs and get data.
- `<parse> @type nginx` tells fluentd to use its nginx parsing engine.
- `expression` formats the logs into a more readable format for fluentd.
- `stdout` tells fluentd to send the logs to the container log to make it easy for us to read and see our changes as they occur.

### LAB Step 1: Extract log data

With the basic log collector in place we first want to extract the metadata into fluentd `keys`.  This lets us use only what we need and provide useful names for the data.

the operator `types` allow us to define for each key the type, like:

- string
- integer
- float
- time
- size
- bool
- .... etc

From the current log stream pipeline add the `types` operator to define types to the various keys.

If you closed the fluentd config map after viewing it above, open it with:

``` bash
kubectl edit cm fluentd-conf -n nondynatrace
```

Looking at the expression line you can see the first value is `<ip>`.  Checking out our types above, a string makes the most sense.  Add the following to your config after the `expression` line.

``` bash
    types: ip:string,
```

Important **NOTE**

Make sure to space over so that `types` is **directly** under `expression`.

``` bash
    expression /^ ......
    types: ip:string,
```

Take a shot at adding the other types to the document.  Then check your work below:

``` bash
    types ip:string,time_local:string,method:string,request:string,httpversion:string,status:string,bytes_sent:integer,responsetime:float,proxy:string,upstream_responsetime:integer,resourcename:string,upstream_status:string,ingress_name:string,resource_type:string,resource_namespace:string,service:string
```

Type :wq *enter* to save and exit.

Use this command to delete the fluentd pods.  This will recreate them with the new configuration.

``` bash
kubectl delete pods -n nondynatrace -l app=fluentd-pipeline
```

You should see two pods deletion notices.  You can ensure they restart with:

``` bash
kubectl get pods -n nondynatrace
```

You might have to run this more than one time until you see `Running` for all pods.

Since there are two fluentd pods running, we need to pick the one attached to nginx.  This command gives us all of the pods and their nodes:

``` bash
kubectl get pod -o=custom-columns=NODE:.spec.nodeName,NAME:.metadata.name --all-namespaces
```

Find your nginx pod and it's associated node.  Find the fluentd pod with the same node (IP address):

![Prometheus_1](../../assets/images/nginx-to-fluentd.png)

Shows the logs from that pod:

``` bash
kubectl logs <pod> -n nondynatrace -f
```

The `-f` command will follow the logs until you press *ctrl-c* to quit.

PSST.  Hey buddy.... you wanna buy an enormous command to impress your friends?  You can skip the commands and matching up nodes above. This single command finds the fluentd pod running in your nginx node and output the logs.  If anybody asks, you didn't hear this from me, OK?

``` bash
kubectl logs $(kubectl get pods -A -l app=fluentd-pipeline -o wide --field-selector spec.nodeName=$(kubectl get pod -o=custom-columns=NODE:.spec.nodeName --selector=app=nginx-nginx-ingress --no-headers) -o=custom-columns=Name:.metadata.name --no-headers) -n nondynatrace -f
```

Check that you don't have any errors from fluentd.  If you do, there is usually something wrong with the yaml file.  Check your spacing.
If you don't see hits coming in, confirm you are generating traffic in another terminal.  **If it stopped**, start it again with:

``` bash
~/hotday_script/load/generateTraffic.sh
```

Most of the lines will have the same type of data.  But it's easy to confirm it worked if your *responsetime* fields now have decimals i.e. `"0.027"`.  That means fluentd extracted the responsetime value, changed it to a numeric (integer) format and exported it.

### Lab Step 2: Improve the data quality

Now that we have a nice data stream, we can improve it further.

#### Update the time key

fluentd parser plugin can also extract which key contains the date with `time_key`.
Reopen the config map with:

```bash
kubectl edit cm fluentd-conf -n nondynatrace
```

Let's modify our current fluentd pipeline by adding a `time_key` and `time_format` line after the `types` operator :

``` bash
    types: ip:string,time_local:string, ...
    time_key time_local
    time_format %d/%b/%Y:%H:%M:%S %z
```

As always, make sure the spacing is perfect and the new lines are directly under `types`.

![Checkpoint!](../../assets/images/cp.png)

Please take a moment to mark the spreadsheet *fluentd - Extract & Improve Data* column for your row with `done`.

#### Define a Prometheus output plugin

Fluentd has a Prometheus plugin that is able to :

- create a prometheus exporter on the fluentd agent
- expose statistics related to the log stream pipeline
- expose custom metrics

Add a new `source` entry directly under the ending of the previous `</source>`  :

```bash
      ...
      keep_time_key true
    </source>

    <source>
      @type prometheus
      bind 0.0.0.0
      port 9914
      metrics_path /metrics
    </source>
```

#### About fluentd filters

We'll further improve the data quality by adding a filter to our log output.  This allows us to:

- add labels to the data.
- define dimensions for our metrics so the data we output to Dynatrace can be sliced and diced.
- exclude lines from the logs that aren't helpful or blank.

The filter itself is simply added as a new section under the last source:

```bash
<filter  nginx>
 @type prometheus

</filter>
```
  
To expose metrics we need to define the metric using `metric`
A metric requires several properties :

- name
- description
- type : counter, gauge, histogram, summary
- the key ( optional)

for example :

```bash
<metric>
    name byte_sent
    type gauge
    desc byte sent
    key bytes_sent
</metric>
```

Labels for our metrics can be either:

- *inside* the metric object for a specific label related to that metric
- *outside* the metric object for common labels for all the metric defined in our pipeline

For example, the labels shown here (pulled from the keys we created earlier) will be applied to metrics that follow.

```bash
<filter  nginx>
 @type prometheus
 <labels>
   method ${method}
   request ${request}
   status ${status}
 </labels>
 <metric>
   name hotday_response_time
   type gauge
   desc responset time
   key responsetime
 </metric>
</filter>
```

### Lab Step 3: Adding a filter, labels, and metrics

Let's build out this framework.  Our goal is to have metrics for response time, bytes sent, status, and total requests.  We want to label them with method, request, status, namespace, service, and resourcename.

To get started, add a `filter` after the last `<source>`.  It should look like:

```bash

</source> (the last one!)

<filter nginx>
  @type prometheus
</filter>

```

As always, ensure the filter starts on the same column as the source was!

Here is how our first label (method) and first metric (response time) would look in this section:

```bash

<filter nginx>
  @type prometheus
  <labels>
    method ${method}
  </labels>
  <metric>
    name hotday_response_time
    type gauge
    desc response time
    key responsetime
  </metric>
</filter>
```

Take a shot at labels for request, status, namespace, service, and resourcename.  Remember these are based on the keys you created earlier!

Then add metrics for bytes sent, total requests, and status.  The gauge types you would use are either `gauge` or `counter` for these metrics.

No peeking! :)  But check your work against the completed filter below:

``` bash
<filter nginx>
  @type prometheus
    <labels>
      method ${method}
      request ${request}
      status ${status}
      namespace ${resource_namespace}
      service ${service}
      resourcename ${resourcename}
    </labels>
    <metric>
      name hotday_response_time
      type gauge
      desc responset time
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
```

Just like before, we need to delete the old fluentd pods:

```bash
kubectl delete pods -n nondynatrace -l app=fluentd-pipeline
```

Check out the logs by finding the correct fluentd pod (the one in same node as nginx) with:

```bash
kubectl get pod -o=custom-columns=NODE:.spec.nodeName,NAME:.metadata.name --all-namespaces
```

And tailing the logs with:

```bash
kubectl logs <pod> -n nondynatrace -f
```

or use the all-in-one command:

```bash
kubectl logs $(kubectl get pods -A -l app=fluentd-pipeline -o wide --field-selector spec.nodeName=$(kubectl get pod -o=custom-columns=NODE:.spec.nodeName --selector=app=nginx-nginx-ingress --no-headers) -o=custom-columns=Name:.metadata.name --no-headers) -n nondynatrace -f
```

If the logs have errors, check your yaml to make sure everything is lined up.  If you don't see traffic, confirm your traffic generator is running and start it again if needed with:

```bash
~/hotday_script/load/generateTraffic.sh
```

![Checkpoint!](../../assets/images/cp.png)

Please take a moment to mark the spreadsheet *fluentd - Created Prometheus filter* column for your row with `done`.

#### Create a service with dynatrace Prometheus annotation to ingest the generated metrics

We need to update the port of the fluentd exporter similar to the prometheus exercise before.

The node exporter is deployed as a Daemonset by the Prometheus Operator.
Run the kubectl command to get the daemonsets:

```bash
kubectl get ds -A
 ```

![FluentD_1](../../assets/images/fluentd_ds.png)

If the result is fluentd, run the command below as-is.  Otherwise update the name before running.

- This will get the container port for the fluentd daemonset.

```bash
kubectl get ds fluentd -o jsonpath='{.spec.template.spec.containers[0].ports[].containerPort}{"\n"}' -n nondynatrace
```

![FluentD_2](../../assets/images/fluentd_port.png)

Open the configuration file below and replace the port.

```bash
vi ~/hotday_script/prometheus/service_fluentd_metric.yaml
```

After the update, the port line should be similar to:

```bash
    metrics.dynatrace.com/port: "9914"
```

Then apply the config file with :

```bash
kubectl apply -f ~/hotday_script/prometheus/service_fluentd_metric.yaml -n nondynatrace
```  

#### Create a graph utilizing the new nginx metrics

Check the terminal window where you are generating traffic to confirm it's still running.  If it stopped for some reason you can start it again with:

```bash
~/hotday_script/load/generateTraffic.sh
```

#### Create a Graph showing the 90th percentile of the response time split by service

Go to the Data Explorer and search for the new metric: `hotday_response_time`

Create a graph with :

- aggregator : Percentile 90th
- Split by : service
  
![fluentd_1_1](../../assets/images/dt_fluentd_metrics.png)

#### Create a Pie graph showing the status code per services

Go to the Data Explorer and search for the new metric: `hotday_requests`

Create a graph with :

- aggregator : Count
- Split by : status,service
  
![fluentd_1_2](../../assets/images/dtu_fluentd_metrics_status.png)

![Checkpoint!](../../assets/images/cp.png)

Please take a moment to mark the spreadsheet *Fluentd - created Graphs* column for your row with `done`.

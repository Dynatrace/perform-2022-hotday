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

To add extra information in the nginx log files add struture the logs by adding extra metadata :
* service name
* namespace of the ingress
* name of the ingress
* response time
* proxy host
* ...etc

IN the cluster the Nginx has already been configure to produce the logs with our extra metadata :
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
    types ip:string,time_local:string,method:string,request:string,httpversion:string,status:integer,bytes_sent:integer,responsetime:float,request_time:float,proxy:string,upstream_responsetime:float,ressourcename:string,ressource_type:string,ressource_namesapce:string,service:string
    time_format %d/%b/%Y:%H:%M:%S %z
</parse>
```
`types` is the operator that will convert the new fluentd keys into the right format.

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
        types ip:string,time_local:string,method:string,request:string,httpversion:string,status:integer,bytes_sent:integer,responsetime:float,request_time:float,proxy:string,upstream_responsetime:float,ressourcename:string,ressource_type:string,ressource_namesapce:string,service:string
        time_format %d/%b/%Y:%H:%M:%S %z
    </parse>
    read_from_head true
    keep_time_key true
</source>
```
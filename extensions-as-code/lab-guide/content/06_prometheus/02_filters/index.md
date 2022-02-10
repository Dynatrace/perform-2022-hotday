## Filters

Sometimes our dataset from Prometheus can be large and have a lot of noise. When extracting metric lines, you can add filtering logic that will result in reporting only the lines for which the dimension value matches the filtering criteria.

Report dimensions only for values that start with the string of your choice

```yaml
filter: const:$prefix(xyz)
```

Report dimensions only for values that end with the string of your choice

```yaml
filter: const:$suffix(xyz)
```

Report dimensions only for values containing a string of your choice

```yaml
filter: const:$contains(xyz)
```

Report dimensions only for values that are equal to the string of your choice

```yaml
filter: const:$eq(xyz)
```

You can create complex filters by combining two or more filters separated by commas using logical expressions:

**$or()** At least one of the given filters matches
**$and()** All of the provided filters match
**$not()** The filter doesn't match

For example:
```yaml
dimensions:
      - key: technology
        value: other
      - key: job
        value: label:job
        filter: const:$or($eq(),$not($or($eq(prometheus),$eq(rabbitmq-server),$eq(redis_exporter),$eq(node_exporter))))
```

In the following example, we are going to collect information about Windows services. Instead of collecting all services, we only want to collect the name of services that are running.

We are interested in the `windows_service_info` metric because it contains a `display_name` field and a `process_id` field. We can see that services that are running have a `process_id` label value of **not** 0

```
windows_service_info{display_name="DCOM Server Process Launcher",name="dcomlaunch",process_id="884",run_as="LocalSystem"} 1
windows_service_info{display_name="DHCP Client",name="dhcp",process_id="1588",run_as="NT Authority\\LocalService"} 1
windows_service_info{display_name="DNS Client",name="dnscache",process_id="1756",run_as="NT AUTHORITY\\NetworkService"} 1
windows_service_info{display_name="Data Sharing Service",name="dssvc",process_id="0",run_as="LocalSystem"} 1
windows_service_info{display_name="Data Usage",name="dusmsvc",process_id="2576",run_as="NT Authority\\LocalService"} 1
windows_service_info{display_name="Delivery Optimization",name="dosvc",process_id="0",run_as="NT Authority\\NetworkService"} 1
windows_service_info{display_name="DevQuery Background Discovery Broker",name="devquerybroker",process_id="0",run_as="LocalSystem"} 1
```

```yaml
  - group: services
    interval: 1m
    dimensions:
      - key: category
        value: Service
    subgroups:
      - subgroup: Services
        featureSet: Running services
        dimensions:
          - key: service_name
            value: label:display_name
          - key: process_id
            value: label:process_id
            filter: const:$not($eq(0))
        metrics:
          - key: custom.prometheus.demo.host.service
            value: metric:windows_service_info
            type: gauge
```

* We want to grab the service name from the prometheus label `display_name`, therefore we create a `key: service_name` and we will use the `value: label:display_name`
* Here is where the filtering happens, we grab the `process_id` label but only those where the value is **not equal** to 0
* We need to define from which metric to grab this information so we grag the metric `windows_service_info` and map it to key `custom.prometheus.demo.host.service`

**Important notes**
* Avoid using double quotes
* `const` must always be in your dimension filter before your function
* The label which you want to filter must be a dimension

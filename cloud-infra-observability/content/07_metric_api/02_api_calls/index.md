## API Calls

### On the following exercises replace everything between double curly bracets with the corresponding value

*{{tenant}}* = my-dynatrace-environment

*{{api-token}}* = my-dynatrace-api-token

First lets start describing the headers to use on the API calls

#### User the following headers:
```bash
Accept : application/json
Authorization: Api-Toke {{api-token}}
```

1. List all the metrics
	```bash
	https://{{tenant}}/api/v2/metrics
	```

2. Simplify this list by just returning the **metricId** and **aggregationType** fields
	```bash
	https://{{tenant}}/api/v2/metrics?fields=metricId,aggregationTypes
	```

3. List all builtin cpu metrics with metricID and dimensionDefinitions. To select the metric we are interested, we will use the **metricSelector** parameter
	```bash
	https://{{tenant}}/api/v2/metrics?metricSelector=builtin:host.cpu.*&fields=metricId,dimensionDefinitions
	```

4. Get the cpu usage definition
	```bash
	https://{{tenant}}/api/v2/metrics/builtin:host.cpu.usage
	```

5. Return two metrics: cpu user and cpu system
	```bash
	https://{{tenant}}/api/v2/metrics?metricSelector=builtin:host.cpu.system,builtin:host.cpu.user
	```

	*Another option would be*

	```bash
	https://{{tenant}}/api/v2/metrics?metricSelector=builtin:host.cpu.(system,user)
	```

6. Use the **text** parameter to look for other metrics with the cpu string
	```bash
	https://{{tenant}}/api/v2/metrics?fields=metricId&text=cpu
	```

7. Retrieve values from the CPU usage of all hosts
	```bash
	https://{{tenant}}/api/v2/metrics/query?metricSelector=builtin:host.cpu.usage
	```

8. Return the information on CVS format. Change the Accept header to use **text/csv**
	```bash
	``Accept : text/csv``
	```

9. Get the Max CPU usage form all hosts by using the transformation **max**
	```bash
	https://{{tenant}}/api/v2/metrics/query?metricSelector=builtin:host.cpu.usage:max
	```

10. Get also the **min** CPU usage
	```bash
	https://{{tenant}}/api/v2/metrics/query?metricSelector=builtin:host.cpu.usage:(max,min)
	```

11. **Sort** the returned information to show the top 3 hosts with Highest CPU usage(avg)
	```bash
	https://{{tenant}}/api/v2/metrics/query?metricSelector=builtin:host.cpu.usage:sort(value(avg, descending)):limit(3):fold
	```

12. Add the host **names** to the previous invocation
	```bash
	https://{{tenant}}/api/v2/metrics/query?metricSelector=builtin:host.cpu.usage:names:sort(value(avg, descending)):limit(3):fold
	```

13. **Filter** on a specific hosts and return the **last** value

	*Replace <HOST-ID> with the ID from one of the monitored hosts*
	```bash
	https://{{tenant}}/api/v2/metrics/query?metricSelector=builtin:host.cpu.usage:avg:names:filter(eq("dt.entity.host","<HOST-ID>")):last
	```

14. Will do the same query but instead of using filter, will select the entity with the **entitySelector** transformation

	*Replace <HOST-ID> with the ID from one of the monitored hosts*
	```bash
	https://{{tenant}}/api/v2/metrics/query?metricSelector=builtin:host.cpu.usage:avg:names:last&entitySelector=entityId("HOST-8767D2CDEF1EB801")
	```

15. Now will introduce another endpoint **/entities**, will use the entities to perform advance filters on our queries

	Using the endpoint **/entities**, get all the entities monitored. Use the **entitySelector** transformation to select all hosts and return their OS

	*Be aware that entitySelector must use always a TYPE(<entity-type>) or entityId(<entity-ID>)*
	```bash
	https://{{tenant}}/api/v2/entities?entitySelector=TYPE("HOST")&fields=properties.osType
	```

16. Get all the hosts with the **tag** "Environment:Test"
	```bash
	https://{{tenant}}/api/v2/entities?entitySelector=TYPE("HOST"),tag(Environment:Test)
	```

17. List all **entityTypes**
	```bash
	https://{{tenant}}/api/v2/entityTypes
	```

18. Get all EC2 instances monitored, their name and localIP
	```bash
	https://{{tenant}}/api/v2/entities?entitySelector=TYPE("EC2_INSTANCE")&fields=properties.localHostName,properties.localIP
	```

19. Using the combination of **metricSelector** and **entitySelector** we can retrieve information form specific entities. Get the CPU usage for all hosts with the tag "Environment:Test"

	```bash
	https://{{tenant}}/api/v2/metrics/query?metricSelector=builtin:host.cpu.usage&entitySelector=TYPE("HOST"),tag("Environment:Test")
	```

20. Filter with entitySelector

	```bash
	https://{{tenant}}/api/v2/metrics/query?metricSelector=builtin:host.cpu.usage:filter(in("dt.entity.host",entitySelector("TYPE(HOST),tag(Environment:Test)")))
	```

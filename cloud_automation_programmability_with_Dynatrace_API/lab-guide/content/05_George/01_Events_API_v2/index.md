# Events API v2

## Topics

-   [Event types](https://www.dynatrace.com/support/help/how-to-use-dynatrace/problem-detection-and-analysis/basic-concepts/event-types)

    Learn the supported event types, along with their severity levels, and the logic behind raising them.

-   [Event analytics](https://www.dynatrace.com/support/help/how-to-use-dynatrace/problem-detection-and-analysis/problem-analysis/event-analytics)

    Gain an understanding of the Events section on each host, process, and service overview page.

-   [Push events from third-party systems](https://www.dynatrace.com/support/help/shortlink/event-analytics#push-events-from-third-party-systems)

    By enabling Davis to consider information from third-party systems, you can have custom events pushed to any topological component (host, process, or service).

-   [Events v2 API Documentation](https://www.dynatrace.com/support/help/dynatrace-api/environment-api/events-v2)


## Event types
----------------------

An event in Dynatrace has a type and severity (significance) level.

-   Resulting problems aggregate all included event severities and are evaluated with the highest severity level of the constituent events.
-   During its lifespan, a problem might raise its severity level. For example, a problem might begin in slowdown level and then be raised automatically to availability level when an outage is detected.

In order from most to least severe, the event types supported in Dynatrace are as follows:

### Monitoring unavailable
----------------------

[Monitoring unavailable events](https://www.dynatrace.com/support/help/how-to-use-dynatrace/problem-detection-and-analysis/basic-concepts/event-types/monitoring-unavailable-events "Learn more about `monitoring unavailable` events and the logic behind raising them.") indicate a widespread monitoring interruption, where the majority of your installed OneAgents lose their connection with the Dynatrace server. This usually manifests itself as a lack of visibility in terms of both availability and performance monitoring.

![Monitoring unavailable events](https://dt-cdn.net/images/icon-availability-events-55-51b4c32ca5.png)

### Availability
------------

[Availability events](https://www.dynatrace.com/support/help/how-to-use-dynatrace/problem-detection-and-analysis/basic-concepts/event-types/availability-events "Learn more about availability events and the logic behind raising them.") indicate high-severity incidents within your environment, such as a complete outage or unavailability of servers or processes.

![Availability events](https://dt-cdn.net/images/icon-availability-events-55-51b4c32ca5.png)

### Error
-----

[Error events](https://www.dynatrace.com/support/help/how-to-use-dynatrace/problem-detection-and-analysis/basic-concepts/event-types/error-events "Learn more about error events and the logic behind raising them.") inform you of increased error rates or other error-related incidents that interfere with the regular operation of your environment.

![Error events](https://dt-cdn.net/images/icon-error-events-54-e5049aa7a5.png)

### Slowdown
--------

[Slowdown events](https://www.dynatrace.com/support/help/how-to-use-dynatrace/problem-detection-and-analysis/basic-concepts/event-types/slowdown-events "Learn more about slowdown events and the logic behind raising them.") indicate a decrease of performance in one of your operational services or applications.

-   While slowdown events are less severe than error or availability events, they inform you of potential issues with the performance of your services.

![Slowdown events](https://dt-cdn.net/images/icon-slowdown-events-54-1c6eb38f9f.png)

### Resource
--------

[Resource events](https://www.dynatrace.com/support/help/how-to-use-dynatrace/problem-detection-and-analysis/basic-concepts/event-types/resource-events "Learn more about resource events and the logic behind raising them.") indicate resource contention. Typical examples:

-   CPU saturation
-   Memory saturation

![Resource events](https://dt-cdn.net/images/icon-resource-events-53-066e31f931.png)

### Custom
------

[Custom alerts](https://www.dynatrace.com/support/help/how-to-use-dynatrace/problem-detection-and-analysis/basic-concepts/event-types/custom-alerts "Learn more about custom alerts and the logic behind raising them.") are used to enable alerting on any user-defined thresholds.

-   Custom alerts for user-defined thresholds can be set for any Dynatrace metric.
-   Custom alerts aren't correlated or modified by Davis, although they are automatically alerted on.

![Custom alerts](https://dt-cdn.net/images/icon-custom-alerts-52-7bfb42c3ee.png)

### Info
----

[Info events](https://www.dynatrace.com/support/help/how-to-use-dynatrace/problem-detection-and-analysis/basic-concepts/event-types/info-events "Learn more about informational events and the logic behind raising them.") indicate manually triggered events that don't result in the creation of a new problem, such as:

-   Important deployments or configuration changes
-   Administrative events (for example, automatic migration of a virtual machine)

Informational events aren't sent out as alerts and no problems are opened, as this type of event doesn't indicate an abnormal situation.


## Event analytics
----

Events are essential raw data that Davis (the Dynatrace AI engine) considers during automated root-cause analysis to understand the reasons underlying any problems that are detected in your environment. Out of the box, Davis detects more than 80 different built-in system [event types](https://www.dynatrace.com/support/help/how-to-use-dynatrace/problem-detection-and-analysis/basic-concepts/event-types "Learn the supported event types, along with their severity levels, and the logic behind raising them."), including process crashes, deployment configuration changes, and VM motion events. Using extension points, you can report custom events through [OneAgent plugins](https://www.dynatrace.com/support/help/extend-dynatrace "Learn what extension mechanisms are offered by Dynatrace.") or via the [Dynatrace API](https://www.dynatrace.com/support/help/dynatrace-api "Find out what you need to use the Dynatrace API.").

The Events section on each host, process, and service overview page provides a chart that displays overall statistics for each event type that occurred during the selected analysis timeframe.

![The events section](https://dt-cdn.net/images/event-pane-1308-b3d1aa263a.png)

## Push events from third-party systems

By enabling Davis to consider information from third-party systems, you can have custom events pushed to any topological component (host, process, or service).

One popular use case is to have your continuous integration (CI) and build toolchain automatically report meta-information about software deployments. Each custom event includes a set of custom key-value properties that your toolchain can use to report important context information.

In the example below, you can see a custom deployment event with user-defined key-value properties for the Jenkins build number and Git commit information.

![Push events from third-party systems](https://dt-cdn.net/images/custom-event-799-3bda12ba2a.png)

### Events API v2 Documentation
----

### List events

[Get an overview](https://www.dynatrace.com/support/help/dynatrace-api/environment-api/events-v2/get-events "List events of your monitoring environment via the Dynatrace API.") of events in your Dynatrace environment.

### View an event

[Get the properties](https://www.dynatrace.com/support/help/dynatrace-api/environment-api/events-v2/get-event "View parameters of an event via the Events API v2.") of an event.

### Ingest an event

[Push external events](https://www.dynatrace.com/support/help/dynatrace-api/environment-api/events-v2/post-event "Ingests an event via the Dynatrace API.") to your Dynatrace environment.

### List event types

[Get an overview](https://www.dynatrace.com/support/help/dynatrace-api/environment-api/events-v2/get-event-types "List event types via the Dynatrace API.") of all event types that Dynatrace creates.

### View an event type

[Get the details](https://www.dynatrace.com/support/help/dynatrace-api/environment-api/events-v2/get-event-type "View parameters of an event type via the Dynatrace API.") of an event type.

### List event properties

[Get an overview](https://www.dynatrace.com/support/help/dynatrace-api/environment-api/events-v2/get-event-properties "List all event properties via the Dynatrace API.") of all event properties that Dynatrace provides.

### View an event property

[Get the details](https://www.dynatrace.com/support/help/dynatrace-api/environment-api/events-v2/get-event-property "View an event property via the Dynatrace API.") of an event property.
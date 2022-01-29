## Metrics and metadata

With just the data source present in the extension the metric collection is rather raw - all metrics are referenced by key and everything appears without any measurement unit which can make it confusing.

The `metrics` section of the extension is there to define additional metadata for metrics. We can define the following:
* `displayName` - human readable name of metric
* `description` - what does this metric actually represent?
* `unit` - measurement unit of the metric
* `tags` - how can we easily find this metric in Metrics catalogue?
* `metricProperties`
  * `minValue` - what's the minimum possible value for the metric
  * `maxValue` - what's the maximum possible value for the metric
  * `impactRelevant` - does this metric depend on other metric anomalies to form the root cause of a Problem?
  * `rootCauseRelevant` - can this metric on its own be the root cause of a Problem?
  * `valueType` - are high values good (`score`) or bad (`error`)?

In our example, we add at least displayName, description and unit

```yaml
metrics:
  - key: custom.wmi.demo.host.cpu.time.processor
    metadata:
      displayName: Used processor time
      description: Percent of used processor time
      unit: Percent
  - key: custom.wmi.demo.host.cpu.time.idle
    metadata:
      displayName: Idle processor time
      description: Percent of idle processor time
      unit: Percent
  - key: custom.wmi.demo.host.cpu.time.user
    metadata:
      displayName: User processor time
      description: Percent of user processor time
      unit: Percent
  - key: custom.wmi.demo.network.bytes.persec
    metadata:
      displayName: Traffic bytes/s
      description: Network traffic bytes per second
      unit: BytePerSecond
  - key: custom.wmi.demo.network.bytes.received.persec
    metadata:
      displayName: Traffic received bytes/s
      description: Network traffic received bytes per second
      unit: BytePerSecond
  - key: custom.wmi.demo.network.bytes.sent.persec
    metadata:
      displayName: Traffic sent bytes/s
      description: Network traffic sent bytes per second
      unit: BytePerSecond
```

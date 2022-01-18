## Metrics and metadata

These metrics will not make much sense if we just read their raw values. We need to make them human readable.

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

Let's make these metrics user friendly:

```yaml
metrics:
  - key: custom.prometheus.demo.host.logical.disk.free.bytes
    metadata:
      displayName: Logical disk free space
      description: Space available on logical disk
      unit: Byte
  - key: custom.prometheus.demo.host.logical.disk.size.bytes
    metadata:
      displayName: Logical disk size
      description: Total size of logical disk
      unit: Byte
  - key: custom.prometheus.demo.host.cpu.processor
    metadata:
      displayName: Processor performance
      description: Average performance of the processor while it is executing instructions
      unit: Percent
  - key: custom.prometheus.demo.host.service
    metadata:
      displayName: Running service
      description: Value of 1 indicating service is running
      unit: Count
```

### Tasks
1. Add metadata to the two remaining metrics for **Disk write latency**, and **Disk read latency** with both using **Second** unit

Your end result should look like [this](../../../assets/images/06_prometheus_metadata.yaml)
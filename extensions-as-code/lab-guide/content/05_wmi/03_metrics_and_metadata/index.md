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

Example:

```yaml
metrics:
  - key: custom.demo.host-observability.host.cpu.time.processor
    metadata:
      displayName: Used processor time
      description: Percent of used processor time
      unit: Percent
  - key: custom.demo.host-observability.host.cpu.time.idle
    metadata:
      displayName: Idle processor time
      description: Percent of idle processor time
      unit: Percent
```

## Tasks (5 minutes)

1. Add the `metrics` section to your `extension.yaml`
2. Define metadata for every metric collected.
3. At minimum, define `displayName`, `description`, and `unit`
4. (Optional) Build the extension using dt-cli and upload it your tenant.
** Make sure you increase the version each time you make a new version
** Make sure you Add a monitoring configuration
** Select your host and Activate it

Your end result should look like [this](../../assets/05_wmi_metadata.yaml)
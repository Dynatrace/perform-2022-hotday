## Data source

For your extension to be able to collect any metrics and have them ingested into Dynatrace, you must define a data source. In this exercise we are using the WMI data source. This must be a section called wmi in your `extension.yaml` file

The purpose of the wmi section is define the WMI queries that retrieve your metrics, how often they should run, and how to map their results into metrics and dimensions that Dynatrace can ingest. Groups and subgroups are used to organise data and define shared properties like dimensions and running frequency.

The extension we're builing uses 3 WMI Queries:

```sql
SELECT Name, PercentProcessorTime, PercentIdleTime, PercentUserTime FROM Win32_PerfFormattedData_PerfOS_Processor WHERE Name LIKE '_Total'
```
* Extracts CPU Usage, User CPU, and Idle CPU for each of the host's processors (by split by cpu id).
```sql
SELECT Name, BytesTotalPersec, BytesReceivedPersec, BytesSentPersec FROM Win32_PerfFormattedData_Tcpip_NetworkAdapter
```
* Extracts the Total, Sent, and Received Bytes per second for each Network Adapter running on the Host
```sql
SELECT Name, BytesTotalPersec, BytesReceivedPersec, BytesSentPersec FROM Win32_PerfFormattedData_Tcpip_NetworkInterface
```
* Extracts the Total, Sent, and Received Bytes per second for each Network Interface running on the Host

These queries use WQL (WMI SQL) and collect calculated formatted performance counters from data classes. More information about what you can collect on [Microsoft's site](https://docs.microsoft.com/en-us/windows/win32/cimwin32prov/computer-system-hardware-classes)

### Metric best practice

Prefixing your metric keys with the name of the extension ensures no clashes will happen in Dynatrace. For this exercise, prefix each metric key with `custom.wmi.demo`

### Other tips

* You can identify the Host running the extension through the `this:device.host` passed as a dimension value.
* You can add dimensions that are fixed strings using the prefix `const:`

### Adding wmi section

After the mandatory fields, we add the `wmi` section and a `Host` group.
In this group we will define how frequent it will poll using `interval`, each dimension pertaining to the host name and subgroups for metrics.

```yaml
name: custom:wmi.demo
version: 1.0.0
minDynatraceVersion: "1.231"
author:
  name: "Dynatrace User"

wmi:
  - group: Host
    interval:
      minutes: 1
    dimensions:
      - key: host
        value: this:device.host
    subgroups:
      - subgroup: CPU
        query: SELECT Name, PercentProcessorTime, PercentIdleTime, PercentUserTime FROM Win32_PerfFormattedData_PerfOS_Processor WHERE Name LIKE '_Total'
        metrics:
          - key: custom.wmi.demo.host.cpu.time.processor
            value: column:PercentProcessorTime
          - key: custom.wmi.demo.host.cpu.time.idle
            value: column:PercentIdleTime
          - key: custom.wmi.demo.host.cpu.time.user
            value: column:PercentUserTime
        dimensions:
          - key: host.cpu.id
            value: column:Name
```

A key dimension called `host` will have the value of the current host that is running the extension.
Notice that the SQL result will have 4 columns, and we are creating metrics that map to each column using `column:<field>` in the `metrics` section

## Tasks

1. Add a new group called `Network` with a 1 minute interval and add a `host` dimension which identifies the host running the extension.
2. Create a subgroup for each remaining WMI query, one called `Adapters` and the other called `Interfaces`. Given above example and map the columns retrieved to metrics and dimensions (hint: each query extracts 3 metrics and 1 dimension)
3. Add a dimension called network.type which takes the value "Adapter" or "Interface" depending on the WMI query
4. (Optional) Build the extension using dt-cli and upload it your tenant, then validate.
    * Make sure you Add a monitoring configuration
    * Select your host and Activate it

The end result should look like [this](../../assets/05_wmi_datasources.yaml)
## Data source

For your extension to be able to collect any metrics and have them ingested into Dynatrace, you must define a data source. In this example we are using the WMI data source. This must be a section called wmi in your `extension.yaml` file

The purpose of the wmi section is define the WMI queries that retrieve your metrics, how often they should run, and how to map their results into metrics and dimensions that Dynatrace can ingest. Groups and subgroups are used to organise data and define shared properties like dimensions and running frequency.

The extension we're building uses 3 WMI Queries:

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

This is our wmi datasource:
```yaml
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

After the mandatory fields, we have the `wmi` section and a `Host` group.
In this group we will define how frequent it will poll using `interval`, each dimension pertaining to the host name and subgroups for metrics.

A key dimension called `host` will have the value of the current host that is running the extension.
```yaml
    dimensions:
      - key: host
        value: this:device.host
```

Our CPU subgroup will have our data source query for Processor performance, using the keyword `query`
```yaml
        query: SELECT Name, PercentProcessorTime, PercentIdleTime, PercentUserTime FROM Win32_PerfFormattedData_PerfOS_Processor WHERE Name
```

Notice that the SQL result will have 4 columns, and we are creating metrics that map to each column using `column:<field>` in the `metrics` section

```yaml
          - key: custom.wmi.demo.network.bytes.persec
            value: column:BytesTotalPersec
```

We have more queries and subgroups regarding Adapters and Interfaces, with an added new concept **Feature sets**
```yaml
  - group: Network
    interval:
      minutes: 1
    dimensions:
      - key: host
        value: this:device.host
    subgroups:
      - subgroup: Adapters
        featureset: Adapters
        query: SELECT Name, BytesTotalPersec, BytesReceivedPersec, BytesSentPersec FROM Win32_PerfFormattedData_Tcpip_NetworkAdapter
        metrics:
          - key: custom.wmi.demo.network.bytes.persec
            value: column:BytesTotalPersec
          - key: custom.wmi.demo.network.bytes.received.persec
            value: column:BytesReceivedPersec
          - key: custom.wmi.demo.network.bytes.sent.persec
            value: column:BytesSentPersec
        dimensions:
          - key: network.type
            value: const:Adapter
          - key: network.name
            value: column:Name
      - subgroup: Interfaces
        featureset: Interfaces
        query: SELECT Name, BytesTotalPersec, BytesReceivedPersec, BytesSentPersec FROM Win32_PerfFormattedData_Tcpip_NetworkInterface
        metrics:
          - key: custom.wmi.demo.network.bytes.persec
            value: column:BytesTotalPersec
          - key: custom.wmi.demo.network.bytes.received.persec
            value: column:BytesReceivedPersec
          - key: custom.wmi.demo.network.bytes.sent.persec
            value: column:BytesSentPersec
        dimensions:
          - key: network.type
            value: const:Interface
          - key: network.name
            value: column:Name
```

Feature sets allow us to toggle which metric subgroups we want to enable collection for. Upon defining your monitoring configuration on your Dynatrace environment, you can select which feature sets you want enabled.

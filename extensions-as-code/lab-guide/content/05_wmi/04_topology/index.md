## Topology

Having a well defined topology model helps make sense of all the metrics and data ingested in Dynatrace. 
For extensions 2.0 this all happens in the `topology` section which is split in two parts:
* `types` - defines which new entity types the extension monitors
* `relationships` - defines if and how these entity types relate to each other

**Key aspects when defining types**
* `idPattern` - must be unique enough to represent each device instance without duplicating it
* `sources` - must define rules for all metrics of the extension that should be split by this entity
  * `condition` - can make use of functions like `$prefix(...)` to define patterns for metric keys
* `attributes` - are optional details that can be extracted from the dimensions of metrics

**Key aspects when defining relationships**
* `sources` - any metric that matches the pattern will be evaluated for a relationship. This means 
it should belong to both entity types part of the relationship

**How to find your new entities**
* Navigate to `../ui/entity/list/{entity-type}` on your Dynatrace tenant. For example:
* ../ui/entity/list/custom_wmi:host
* ../ui/entity/list/custom\_wmi:network\_device

Example:
```yaml
topology:
  types:
    - name: custom_wmi:host
      displayName: Host
      enabled: true
      rules:
        - idPattern: wmi_host_{dt.entity.host}
          sources:
            - sourceType: Metrics
              condition: $prefix(custom.wmi.demo)
          attributes: []
          requiredDimensions: []
          instanceNamePattern: Host - {host.name}
```

## Tasks
1. Add the `topology` section to your `extension.yaml`
2. Define two entity types for a Host and a Network Device
3. Ensure that network devices are aware of the type (Adapter or Interface)
4. Create a relationship between the two where a Network Device runs on a Host
5. (Optional) Build the extension using dt-cli and upload it your tenant.
** Make sure you increase the version each time you make a new version
** Make sure you Add a monitoring configuration
** Select your host and Activate it

Example template:
```yaml
relationships:
    - typeOfRelation: RUNS_ON
      fromType: 
      toType: 
      enabled: true
      sources:
        - sourceType: Metrics
          condition: 
```

Your end result should look like [this](../../assets/05_wmi_topology.yaml)

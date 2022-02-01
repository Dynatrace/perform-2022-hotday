## Metric Expression Alert

### Alert with a Metric Expressions about a Kubernetes Node with High Usage
1. Create a new Custom event for alerting
2. Select the Code option

```bash
(((builtin:cloud.kubernetes.node.cores:avg)-(builtin:cloud.kubernetes.node.cpuAvailable:avg))/(builtin:cloud.kubernetes.node.cores:avg)*(100))
```

3. In the "Advanced entity settings" Select "Kubernetes Node" as primary entity
4. Set static threshold to 80
5. Above threshold for 3 slots during 5 period
6. Event Severity: Resource

![metricalert](../../../assets/images/metricalert.png)

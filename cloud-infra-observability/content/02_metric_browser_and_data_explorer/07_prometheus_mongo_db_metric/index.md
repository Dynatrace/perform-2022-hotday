## Prometheus Mongo DB Metric

### Scenario
- The MongoDB team is pulling metrics from Prometheus
- The metric mongodb_connections should be taken in consideration by DAVIS AI as an indicator for a faulty component
- You want to update the metric settings to be Root Cause Relevant

### Metric Metadata
1. Navigate to Observe and Explore - Metrics
2. Search for mongodb_connections
3. Edit metric metadata
4. Unit: Count
5. Metric Properties: Toggle on Root Case Relevant

![mongometa](../../../assets/images/mongometa.png)

### Metrics Explorer
1. Search for mongodb_connections
2. Tile Title: MongoDB Connections
3. Aggregation: Count
4. Pin to dashboard

![mongotile](../../../assets/images/mongotile.png)

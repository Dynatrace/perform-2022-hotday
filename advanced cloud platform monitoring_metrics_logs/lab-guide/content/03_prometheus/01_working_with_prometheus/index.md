## Working with Prometheus

In this module we'll learn about Prometheus and how to do the following:
> Configure an Exporter
> Define an Alert
> Use PromQL 

### What is Prometheus?
An open-source monitoring and alerting toolkit, which collects and stores metrics from within your cloud-native stacks via exporters.  

Key Features:
- a multi-dimensional data model
- PromQL (prometheus query langauge), a flexible query language to select and aggregate time series in real time
- Supports both pull,push method of ingesting time series data
- Identifies targets via Service discovery or static config 

Components:
1. Prometheus Server
- Retrieval
> Collects metrics from pre-defined exporters

- TSDB
> Storage for collected time series metircs

- HTTP Server
> Provides a UI to visualize and query metircs in dashboards using Grafana

2. Alertmanager
> Manages and raises alerts based on rules defined in Prometheus

![Prometheus Components](../../assets/images/prometheus.png)

### Configure an Exporter
### Define an Alert
### Use PromQL
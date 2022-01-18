## Prometheus Extension

Prometheus is an open-source tool that collects and stores metrics from running jobs as time series data in a multi-dimensional data model.

Dynatrace provides you with a framework that you can use to extend your application and services observability into data acquired directly from Prometheus. The Dynatrace extensions framework can pull Prometheus metrics from the `/metrics` endpoint, a Prometheus API endpoint, or a data exporter (Prometheus target).

We will use a Windows-exporter that exposes metrics from the system it runs on to a `/metrics` endpoint. This simulates data as it comes from Prometheus.

In this exercise, we will create an Extension 2.0 that scrapes metrics from that Windows-exporter.

At the end of this lab, we will have:

1. A built Prometheus extension
2. A monitoring configuration in Dynatrace
3. Metrics ready to be used on dashboards.
4. A packaged and ready to distribute version

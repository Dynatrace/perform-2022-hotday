## Prometheus Metrics in Dynatrace

In this step, we will annotate the exporters so that the OneAgents running on the cluster know to pull the Prometheus metrics and push them to the Dynatrace tenant.

### Annotate the node-exporter
- First we need to get the pod name:
      
      ```
      kubectl get pods
      ```

      ![Node Exporter](../../../assets/images/node_exporter_annotations.png)

- Next we will replace **node-exporter** with the pod name in the commands below and run them to annotate the pod:

      ```
      kubectl annotate pod node-exporter metrics.dynatrace.com/scrape=true --namespace=default
      kubectl annotate pod node-exporter metrics.dynatrace.com/port=9100 --namespace=default
      ```



### Annotate the mongodb-exporter
We will follow a similar pattern for the mongodb-exporter
- First we need to get the pod name:
      
      ```
      kubectl get pods
      ```

      ![Mongo Exporter](../../../assets/images/mongo_exporter_annotations.png)

- Next we will replace **mongodb-exporter** with the pod name in the commands below and run them to annotate the pod:

      ```
      kubectl annotate pod mongodb-exporter metrics.dynatrace.com/scrape=true --namespace=default
      kubectl annotate pod mongodb-exporter metrics.dynatrace.com/port=9216 --namespace=default
      ```

### Filter Prometheus metrics
By default, all of the metrics collected by the annotated exporter(s) will be pulled into Dynatrace. 
- However, you can limit the metrics by annotating the pod with an optional filter key as below:

      ```
      metrics.dynatrace.com/filter: |
          {
            "mode": "include",
            "names": [
                "metrics-name-1",
                "metrics-name-2",
                "metrics-name...n"
            ]
        }
      ```
      - **Note**: Replace the metrics-name-1, metrics-name-2, etc. with the appropriate key of the metrics you would like pulled in by Dynatrace.
  
- Now, let's annotate our mongodb-exporter to limit our collection of metrics to two:
      - "mongodb_network_metrics_num_requests_total, mongodb_asserts_total"

- Replace **pod_name** with the mongodb-exporter pod name:
      
      ```
      kubectl edit pod pod_name
      ```
- Add the below section to the pod's yaml (be careful with spacing here):

      ```
            metrics.dynatrace.com/filter: |
              {
                  "mode": "include",
                  "names": [
                      "mongodb_network_metrics_num_requests_total",
                      "mongodb_asserts_total"
                  ]
              }
      ```

      ![Filter](../../../assets/images/filter_annotation.png)

- Once added, press **ESC + :wq** to quit the editor. The pod is now annotated with the filtered metrics you will receive in Dynatrace.

      - **Note**: mode supports both **include** and **exclude** keywords. Also, the names accept wildcard like mongo* should you have multiple metrics with similar text patterns.

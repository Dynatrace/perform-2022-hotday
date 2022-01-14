## Using metric events for alerting

### Step 1: Create a custom event for alerting
1. Go to Settings > Anomaly detection > Custom events for alerting
1. Click on `Create custom event for alerting`.
   ![Settings](../../../assets/images/06_open_observability-04alerts1.gif)
1. Under `Metric` section, select `Span Failure Rate`.
   ![Settings](../../../assets/images/06_open_observability-04alerts2.png)
1. Scroll down to the `Static threshold` section, configure the following parameters
   - Alert anomalies with a static threshold of `5` percent (%)
   - Raise alert if ... the threshold for `1` minute slots
   - during any `3` minute period.
   ![Settings](../../../assets/images/06_open_observability-04alerts3.png)
1. Scroll down further down to the `Event description` section and configure the event description as follows
   - Title: `Blackbox failures`
   - Severity: `Error`
   ![Settings](../../../assets/images/06_open_observability-04alerts4.png)
1. Finally, click on `Create custom event for alerting` button.
1. The final configuration screen should look like the following.

![Settings](../../../assets/images/06_open_observability-04alerts5.png)

### Step 2: Problem detection
1. Execute a few transactions.
1. A problem card should appear after a few minutes.

![Problem card](../../../assets/images/06_open_observability-04alerts6.png)

### Step 3: Drill down into problem card for details

![Problem card](../../../assets/images/06_open_observability-04alerts7.png)

1. Drill down into the problem card and navigate between the screens.
1. Observe how easy it is to move between one view and the next.
1. This is because Dynatrace has everything in context!
## Create custom event for alerting

In this step, we will create a custom event for alerting based on the metric from the previous step.

1. Navigate to **Settings** > **Anomaly detection** > **Custom events for alerting**
    - Click on **Create custom event for alerting**



    ![Custom Event Navigation](../../../assets/images/custom_event_nav.png)

2. Filter for *Metric* **log.user.invalid\_id\_hex\_error**

    ![Custom Event Filter](../../../assets/images/custom_event.png)

3. Set the static threshold as:
    - Alert with a static threshold of **1**
    - Raise an alert if the metric is **above** the threshold for
    - **1** one minute slots during any **3** minute period

    ![Custom Event Threshold](../../../assets/images/custom_event_threshold.png)

4. Add a title in the *Event description* such as **User - Invalid Id Hex**
    - Click on **Create custom event for alerting**

    ![Create Custom Event](../../../assets/images/create_custom_event.png)


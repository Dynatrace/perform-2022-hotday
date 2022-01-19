## Create metric

In this step, we will create a metric based on log content.

1. Navigate to the **Logs** page

    ![Log Navigation](../../../assets/images/logs_navigation.png)

2. Filter for **status: error** and **content: err="Invalid Id Hex"**

    ![Log Error](../../../assets/images/log_error.png)

3. Click on the **Create metrics** button
4. Add *key* **log.user.invalid\_id\_hex\_error**
5. Add dimension **_dt.kubernetes.event.involved\_object.name_**
6. Click on **Save changes**

    ![Create Log Metric](../../../assets/images/create_log_metric.png)




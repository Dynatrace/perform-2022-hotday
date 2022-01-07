## Metric Browser and Data Explorer

In this section, you will learn to leverage the Metric Browser and Data Explorer to visualize metrics and create powerful dashboards.

![dashboard](../../assets/images/dashboard.png)

### Exercise Prep
1. Navigate to the Dynatrace University Terminal and ensure you're connected to the EC2 instance
2. Navigate to the Perform-Host-22-Cloud-Infra directory

```bash
cd Perform-Hot-22-Cloud-Infra
```

3. Start the Cron Job Monitoring script

```bash
python3 cronjobduration.py
```

- This will start a script that reports the duration of Cron job executions to the OneAgent. We need this data during this exercise.

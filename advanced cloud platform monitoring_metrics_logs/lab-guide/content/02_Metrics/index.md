## Metrics

In this module, we'll:
- Ingest custom metrics via Metric API
- Dashboard custom metrics
- Create a custom metric event

#### Dynatrace Metric API
1. Create API Token
> 1. Navigate to `Access Tokens` via Dynatrace Menu : `Managed > Access Tokens`
> 2. Click on Create New Token
![metric 1](../../assets/images/metric_1.png)

> 3. Set token name `Perform 2022`
![metric 1_1](../../assets/images/metric_1_1.png)

> 4. Search for `metric`
> 5. Select `Ingest Metrics` & `Read Metrics` & `Write Metrics` API v2
![metric 2](../../assets/images/metric_2.png)

> 6. Search for `logs`
> 7. Select ` Ingest Logs` & `Read Logs` API v2
![metric 3](../../assets/images/metric_3.png)

> 8. Click on `Generate Token`
> 9. Copy and Save Token to Notepad
![metric 4](../../assets/images/metric_4.png)

2. POST Metric via API
> 1. Navigate to `Environment API v2` via Account Icon
![metric 4.4](../../assets/images/metric_4.4.png)

> 2. Search for `Metrics` then select `POST` /metrics/ingest
![metric 4.5](../../assets/images/metric_4.5.png)

> 3. Copy and Paste API-TOKEN via lock icon and authorize token
![metric 4.6](../../assets/images/metric_4.6.png)

> 4. Click on `Try it out`
> 5. Copy and Paste the metrics below :
```
perform2022.mycool.metric,state=Nevada,country=US 45
perform2022.mycool.metric,state=Nevada,country=US 55
perform2022.mycool.metric,state=Nevada,country=US 65
perform2022.mycool.metric,state=Nevada,country=US 73
```

> 6. Click on execute
![metric 4.7](../../assets/images/metric_4.7.png)

> 7. Validate response
```
{
  "linesOk": 4,
  "linesInvalid": 0,
  "error": null,
  "warnings": null
}
```

> 8. Execute the command several more times over a couple minutes

3. Validate Metric in Dynatrace
> 1. Navigate to `Metrics` via Dynatrace menu : `Observe and explore > Metrics`
> 2. Search for `perform2022`
![metric 5](../../assets/images/metric_5.png)

> - It may take a minute, refresh screen if metric doesn't appear

### Dashboard
1. Create a Dashboard
> 1. Navigate to `Dashboards` via Dynatrace menu: `Observe and explore > Dashboards`
> 2. Click on `Create Dashboard`
> 3. Set name to `Perform 2022 Dashboard`
![metric 6](../../assets/images/metric_6.png)

2. Pin Metric to Dashboard
> 1. Navigate to `Explore Data` via Dynatrace menu: `Observe and explore > Explore Data`
> 2. Search for `Perform2022`
> 3. Split by `Country` & `State`
> 4. Click on `Run query`
![metric 7](../../assets/images/metric_7.png)

> 5. Click on `Pin to Dashboard`
> 6. Find the `Perform 2022 Dashboard` Dashboard
> 7. Set tile to `Perform 2022 Metric`
> 8. Click on `Pin`
![metric 8](../../assets/images/metric_8.png)

3. Review Dashboard
> 1. Open `Perform 2022 Dashboard` and review `Perform 2022 Metric` tile
![metric 9](../../assets/images/metric_9.png)

### Analyze and Alert
1. Create Custom Metric Event for Alerting
> 1. Navigate to `Custom Events for alerting` via Dynatrace menu: `Manage > Settings > Anomaly Detection > Custom Events for Alerting`
![metric 10](../../assets/images/metric_10.png)

> 2. Click on `Create custom event for alerting`
> 3. Search for `Perform2022`
![metric 10.1](../../assets/images/metric_10.1.png)

> 4. Set threshold to `30`
> 5. Set threshold time to `1` one minute in every `3` minute period
![metric 11](../../assets/images/metric_11.png)

> 6. Set Event Description Title to `Perform2022 Custom Metric Event`
> 7. Set Severity to `Error`
> 8. Add the following to message
```
Dynamic Country: {dims:country}
Dynamic State: {dims:state}
``` 
> - 
![metric 12](../../assets/images/metric_12.png)

2. Generate Problem
> 1. Execute the command we used to ingest the `Perform2022.mycool.metric` several times over a couple minutes
> 2. Navigate to `Problems` via Dynatrace menu: `Observe and explore > Problems`
> 3. A new problem with the title `Perform2022 Custom Metric Event` will open
![metric 13](../../assets/images/metric_13.png)

> 4. Click on the problem to open the problem card
> 5. Identify the dynamic `Country` and `Sate` value
![metric 14](../../assets/images/metric_14.png)
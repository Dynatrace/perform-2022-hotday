## Metrics

In this module, we'll:

- Ingest custom metrics via Metric API
- Dashboard custom metrics
- Create a custom metric event

## Dynatrace Metric API

### Create API Token

Navigate to `Access Tokens` via Dynatrace Menu : `Manage > Access Tokens`

- Click on Generate New Token

![metric 1](../../assets/images/metric_1.png)

 -Set token name `Perform 2022`

![metric 1_1](../../assets/images/metric_1_1.png)

- Search for `metric`
- Select `Ingest Metrics` & `Read Metrics` & `Write Metrics` API v2

![metric 2](../../assets/images/metric_2.png)

- Search for `logs`
- Select ` Ingest Logs` & `Read Logs` API v2

![metric 3](../../assets/images/metric_3.png)

- Click on `Generate Token`
- Copy and Save Token to Notepad and click DONE.

![Checkpoint!](../../assets/images/cp.png)

Please take a moment to mark the spreadsheet *Metrics - Created Tokens* column for your row with `done`.

### Send data to Dynatrace

![metric 4](../../assets/images/metric_4.png)

- POST Metric via API
- Navigate to `Environment API v2` via Account Icon

![metric 4.4](../../assets/images/metric_4.4.png)

- Search for `Metrics` then select `POST` /metrics/ingest

![metric 4.5](../../assets/images/metric_4.5.png)

- Copy and Paste API-TOKEN via lock icon and authorize token

![metric 4.6](../../assets/images/metric_4.6.png)

- Click on `Try it out`
- Copy and Paste the metrics below :

```bash
perform2022.mycool.metric,state=Wisconsin,country=US 22
perform2022.mycool.metric,state=Georgia,country=US 67
perform2022.mycool.metric,state=Maine,country=US 55
perform2022.mycool.metric,state=Nevada,country=US 42
```

- Click on execute

![metric 4.7](../../assets/images/metric_4.7.png)

- Validate response

```bash
{
  "linesOk": 4,
  "linesInvalid": 0,
  "error": null,
  "warnings": null
}
```

Execute the command several more times over a couple minutes.

### Validate Metric in Dynatrace

- Navigate to `Metrics` via Dynatrace menu : `Observe and explore > Metrics`
- Search for `perform2022`

![metric 5](../../assets/images/metric_5.png)

- It may take a minute, refresh screen if metric doesn't appear

![Checkpoint!](../../assets/images/cp.png)

Please take a moment to mark the spreadsheet *Metrics - Called API* column for your row with `done`.

### Dashboard Setup

- Create a Dashboard
- Navigate to `Dashboards` via Dynatrace menu: `Observe and explore > Dashboards`
- Click on `Create Dashboard`
- Set name to `Perform 2022 Dashboard`

![metric 6](../../assets/images/metric_6.png)

Pin Metric to Dashboard

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

### Review Dashboard

Open `Perform 2022 Dashboard` and review `Perform 2022 Metric` tile

![metric 9](../../assets/images/metric_9.png)

### Analyze and Alert

Create Custom Metric Event for Alerting.

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

```bash
Dynamic Country: {dims:country}
Dynamic State: {dims:state}
```

![metric 12](../../assets/images/metric_12.png)

Generate Problem

> 1. Execute the command we used to ingest the `Perform2022.mycool.metric` several times over a couple minutes
> 2. Navigate to `Problems` via Dynatrace menu: `Observe and explore > Problems`
> 3. A new problem with the title `Perform2022 Custom Metric Event` will open

![metric 13](../../assets/images/metric_13.png)

> 4. Click on the problem to open the problem card
> 5. Identify the dynamic `Country` and `Sate` value

![metric 14](../../assets/images/metric_14.png)

![Checkpoint!](../../assets/images/cp.png)

Please take a moment to mark the spreadsheet *Metrics - Created Dashboard & Alerts* column for your row with `done`.

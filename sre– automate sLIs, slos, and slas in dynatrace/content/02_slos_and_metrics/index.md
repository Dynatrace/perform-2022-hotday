## What is an SLO?

**_SLIs_** drive **_SLOs_** which inform **_SLAs_**!

### Service Level Indicators (SLIs)
**Percentage** of an **important metrics** against a **criteria**
 ```
 Example: Service Response Time p95 < 400ms
```
### Service Level Objectives
**Sucess**-**% SLI** over a **timeline**
```
Example: p95 < 400ms in 90% of the time over 30 days
```
### Error Budget
How much more **impact** can we **afford** before violating SLO?
### Service Level Agreements (SLAs)
What happens IF SLO is breached
```
Example: Paying penalities, loosing customers ...
```

## SLO 101 in Dynatrace
### Service-Level Indicator (SLI)
Any metrics including Built-in or Custom Metrics

### Target 
- % success rate or 
- % of good requests over all requests

### Evaluation Period
Defined observation timeframe used in any communication about the SLO results

### SLO status
The current normalized evaluation result of the SLO as 0-100%

### SLO error budget
Difference between SLO status and SLO target

![Example of an SLO tile that incorporates each of the defined criteria above](../../assets/SLO_tile.png)


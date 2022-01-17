## Metric API v2
### _Utilize v2 APIs to Level Up Your Data_
In this example we will explore the /metrics/query endpoint, and how it can be used to export data from Dynatrace
### Overview

- Metric selectors
- Resolution
- Timeframe
- Entity selector
- Metric transformations

### Step 1. Metric Selectors
1. We'll be using the `query` endpoint of the `metrics v2 API` to fetch our data.

   ```python
   url = "/api/v2/metrics/query"
   ```
2. Metric selectors consist of the following elements
 - Metric key (This must be the first element in your query)
  **Builtin:host.cpu.usage**
 - Aggregation
 Builtin:host.cpu.usage:**avg**
 - Splitting
  Builtin:host.cpu.usage:avg:**splitBy("dt.entity.host")**
 - Scope
 Builtin:host.cpu.usage:avg:splitBy("dt.entity.host"):**filter(and(in("dt.entity.host",entitySelector("type(host),tag(~"TEST~")"))))**

The best place to build metric selectors is in the Data Explorer

### Step 2. Resolution
1. How can I split my datapoints up?
- The default number of data points is **120**
- For a singular data point use **Inf**
- To set a timespan between datapoints use the time series notation
 ``` 
10m = Ten minutes between datapoints
1h = One hour between datapoints
1M = One month between datapoints
```

### Step 3. Timeframe
1. From what period of time do I want to pull my data?
- Default is the current timeframe to two hours ago
- The "From" field will represent the start of the timeframe
- The "To" field will represent the end of the timeframe

### Step. 4 Entity Selector
1. How can I filter the entities?
- Entity selectors require the "type()" element
- Example: type(SERVICE),mzName('DEV') 

### Step. 5 Metric Transformations
1. How can I augment my data?
- Delta: Take the difference between data points
- Fold: Combine data points into a singular data point
- Last: Returns the most recent datapoint
- Limit: Returns the specified number of tuples
- Merge: Removes specified dimesnions from the result


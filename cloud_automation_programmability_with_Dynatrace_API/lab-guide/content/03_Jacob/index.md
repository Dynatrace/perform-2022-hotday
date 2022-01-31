
# Metric API v2
## _Utilize v2 APIs to Level Up Your Data_
In this example we will explore the /metrics/query endpoint, and how it can be used to export data from Dynatrace. Please use the token generated earlier in  the session and follow along!
## Overview

- Metric selectors
- Resolution
- Timeframe
- Entity selector
- Metric transformations

## Step 1. Metric Selectors
1. We'll be using the `query` endpoint of the `metrics v2 API` to fetch our data.

   ```python
   url = "/api/v2/metrics/query"
   ```
2. Metric selectors consist of the following elements
 - Metric key (This must be the first element in your query)
	```
	builtin:host.cpu.usage
	```
 - Aggregation
	```
	builtin:host.cpu.usage:avg
	```
 - Splitting
	```
	builtin:host.cpu.usage:avg:splitBy("dt.entity.host")
	```
 - Scope
	```
	Builtin:host.cpu.usage:avg:splitBy("dt.entity.host"):filter(and(in("dt.entity.host",entitySelector("type(host),tag(~"TEST~")"))))
	```

***The best place to build metric selectors is in the Data Explorer***

## Step 2. Resolution
1. How can I split my datapoints up?
- The default number of data points is **120**
- For a singular data point use **Inf**
- To set a timespan between datapoints use the time series notation
	 ``` 
	10m = Ten minutes between datapoints
	1h = One hour between datapoints
	1M = One month between datapoints
	```

***API Request***
```
https://YOUR_ENVIRONMENT/api/v2/metrics/query?metricSelector=builtin%3Ahost.cpu.usage%3Aavg%3AsplitBy%28%22dt.entity.host%22%29%3Afilter%28and%28in%28%22dt.entity.host%22%2CentitySelector%28%22type%28host%29%2Ctag%28~%22TEST~%22%29%22%29%29%29%29&resolution=inf
```

## Step 3. Timeframe
1. From what period of time do I want to pull my data?
- Default is the current timeframe to two hours ago
- The "From" field will represent the start of the timeframe
- The "To" field will represent the end of the timeframe

***Example***
From
```
now-4h
```
To
```
now
```

***API Request***
```
https://YOUR_ENVIRONMENT/api/v2/metrics/query?metricSelector=builtin%3Ahost.cpu.usage%3Aavg%3AsplitBy%28%22dt.entity.host%22%29%3Afilter%28and%28in%28%22dt.entity.host%22%2CentitySelector%28%22type%28host%29%2Ctag%28~%22TEST~%22%29%22%29%29%29%29&resolution=inf&from=now-4h
```

## Step. 4 Entity Selector
1. How can I filter the entities?
- Entity selectors require the "type()" element
- Example: type(SERVICE),mzName('DEV') 

***API Request***
```
https://YOUR_ENVIRONMENT/api/v2/metrics/query?metricSelector=builtin%3Ahost.cpu.usage%3Aavg%3AsplitBy%28%22dt.entity.host%22%29%3Afilter%28and%28in%28%22dt.entity.host%22%2CentitySelector%28%22type%28host%29%2Ctag%28~%22TEST~%22%29%22%29%29%29%29&resolution=inf&from=now-4h&entitySelector=type%28HOST%29%2CmzName%28%E2%80%98DEV%27%29
```

## Step. 5 Metric Transformations
1. How can I augment my data?
- Delta: Take the difference between data points
	```
	builtin:host.cpu.usage:avg:splitBy("dt.entity.host"):filter(and(in("dt.entity.host",entitySelector("type(host),tag(~"TEST~")")))):delta
	```
- Fold: Combine data points into a singular data point similar to using the ***Inf*** resolution
	```
	builtin:host.cpu.usage:avg:splitBy("dt.entity.host"):filter(and(in("dt.entity.host",entitySelector("type(host),tag(~"TEST~")")))):fold(avg)
	```
- Last: Returns the most recent datapoint
	```
	builtin:host.cpu.usage:avg:splitBy("dt.entity.host"):filter(and(in("dt.entity.host",entitySelector("type(host),tag(~"TEST~")")))):last(avg)
	```
- Partition: Creates a dimension based upon custom threshold
	```
	builtin:host.cpu.usage:avg:splitBy("dt.entity.host"):filter(and(in("dt.entity.host",entitySelector("type(host),tag(~"TEST~")")))):partition("Utilitzation Category",value("Under",lt(35)),value("Right-Sized",otherwise),value("Over",gt(70)))
	```
- Merge: Removes specified dimensions from the result
	```
	builtin:host.cpu.usage:avg:splitBy("dt.entity.host"):filter(and(in("dt.entity.host",entitySelector("type(host),tag(~"TEST~")")))):partition("Utilitzation Category",value("Under",lt(35)),value("Right-Sized",otherwise),value("Over",gt(70))):merge("dt.entity.host")
	```

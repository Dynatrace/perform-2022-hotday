# Hands-on 4

## 1) Create a multi-dimensional analysis view
1. In the main menu, open group "Applications & Microservices"
1. Click on "Services"
1. Click on "BookingService"
1. Click on "Create analysis view"
1. Select "Revenue" as Metric
1. Leave "Aggregation" as "Average"
1. Delete the default "Split by dimension" value and type "loyalty" then click the auto-completed value "{RequestAttribute:Loyalty Status}"
1. Click the checkmark at the end of the field

## 2) Create metric 

1. Click on "Create metric..."
1. Type "Revenue by Loyalty Status" on the "Metric name"
1. Click on "Create metric"
1. Click on "Create chart"
1. Click on "Run query" until the first datapoints appear

## 3) Customize chart
1. Click  "Add Metric" twice, to have 3 metrics (A, B and C)
1. Type "revenue" in the metric selection and select "Revenue by Loyalty Status" in B and C
1. Click and select "Dimension" in the "Split by" field in B and C
1. Click and select "Dimension" in the "Filter by" field in A, B and C
1. For each, select a different dimension
1. Click "Run query"
1. On the right side of the screen, locate the three series settings
1. Change all to column
1. Select the colors of your preference for each

## 4) Add chart to dashboard

1. Click on "Pin to dashboard"
1. Make sure our dashboard is selected
1. Type "Revenue by Loyalty Status" in the "Tile title" field
1. Click on "Pin"
1. Click on "Open dashboard"
1. Position the tile below the funnel

## 5) Custom events for alerting

1. Navigate to "Settings"
1. Click on "Anomaly detection" menu group
1. Click on "Custom events for alerting"
1. Click on "Create custom event for alerting"
1. Leave the "Category" unchanged
1. Type "revenue" in the Metric field and select the metric
1. Expand "Dimensions"
1. Click on the "Filtered by" field and select "Platinum"
1. Click on "Add rule-based filter"
1. Leave "Property" unchanged
1. Leave "Operator" unchanged
1. Click on "Value" field and select "BookingService"
1. Click on "Create rule-based filter"
1. Scroll down to find the "Monitoring strategy" section
1. Select "Auto-adaptive baseline"
1. Change the values so it matches

>Alert anomalies of `1` times the normal signal fluctuation.
>
> Raise an alert if the metric is `below` the baseline for `2` minutes during any `30` minute period.

1. Scroll down to find the "Event description" section
1. Type "Reduced bookings for Platinum users" on the "Title" field
1. Leave the other fields unchanged
1. Click on "Create custom event for alerting" 
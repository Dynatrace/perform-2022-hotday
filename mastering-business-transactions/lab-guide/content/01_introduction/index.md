
Perform 2022

Mastering Business Transactions

[Hands-on 1](#hands-on-1)

[Hands-on 2](#hands-on-2)

[Hands-on 3](#hands-on-3)

[Hands-on 4](#hands-on-4)

# Hands-on 1

## 1) User action naming
1. In the main menu, open group "Applications & Microservices"
1. Click on "Frontend"
1. Click on "My web application"
1. Top-right menu, click on the three dots button "..."
1. Click on "Edit"
1. Click on "Capturing" menu group
1. Click on "User actions"
1. Scroll down to "User action naming rules"
1. **Click the middle tab "Naming rules for XHR actions"**
1. Click "Add naming rule"
1. Paste the text below in the field "Naming pattern"

```{userInteraction (default)} on "{elementIdentifier (default)}"```

11. Scroll down to validate in "Preview your rule"
1. Click "Save"

## 2) Key user actions

1. In the main menu, open group "Applications & Microservices"
1. Click on "Frontend"
1. Click on "My web application"
1. Scroll down to find "Top 3 user actions" section
1. Click on "View full details" of this section
1. Scroll down to "Top 100 user actions" section, just below the charts
1. Click on the filter field and a dropdown list will appear
1. Change the dropdown from "in top 100 actions..." to "in all user actions"
1. In the filter, type "sign in"
1. Find the action 'click on "sign in"' in the filtered table
1. Click on the name of the action
1. Top-right menu, click on "Mark as key user action"
1. Click on "User actions" in the breadcrumbs menu
1. Scroll down to "Top 100 user actions" section, just below the charts
1. Click on the filter field and a dropdown list will appear
1. Change the dropdown from "in top 100 actions..." to "in all user actions"
1. In the filter, type "book now"
1. Find the action in the filtered table
1. Click on the name of the action
1. Top-right menu, click on "Mark as key user action"
1. Click on "User actions" in the breadcrumbs menu
1. Scroll down to the list of actions
1. Click on the tab "Key user actions (2)"
1. Find the two actions that were defined

## 3) Conversion goal

1. In the main menu, open group "Applications & Microservices"
1. Click on "Frontend"
1. Click on "My web application"
1. Top-right menu, click on the three dots button "..."
1. Click on "Edit"
1. Click on "Session Replay and behaviour" menu group
1. Click on "Conversion goals"
1. Click on "Add goal"
1. Type "Travel bookings" on "Name" field
1. Change "Type of goal" to "User Action"
1. Change "Rule applies to" to "XHR actions"
1. Change "begins with" to "contains"
1. Type "book journey for" in the last field
1. Click on "Add goal"

## 4) Create dashboard
1. Start a new dashboard called "Mastering Business Transactions"
1. In the main menu, open group "Observe and explore"
1. Click on "Dashboards"
1. Click on "Create dashboard"
1. In the tile filter, type "key"
1. Find the "Key user action" tile
1. Either drag and drop or double-click it
1. Select application and key user action names
1. Repeat for the "book now" user action
1. In the tile filter, type "conversion"
1. Find the "Conversion goal" tile
1. Either drag and drop or double-click it

# Hands-on 2

## 1) Funnel query

1. In the main menu, open group "Digital Experience"
1. Click on "Query user sessions"
1. Type the query below in the input field

```
SELECT FUNNEL(useraction.name='loading of page /easytravel/search' AS 'Search', useraction.name='click on "book now"' AS 'Book', useraction.name='click on "sign in"' AS 'Authenticate', useraction.name LIKE '*book journey for*' AS 'Pay') FROM usersession
```
4. Click on "Run query"
1. Click the pencil to edit the name of the chart
1. Change the name to "Conversion funnel"
1. Click on "Pin to dashboard"
1. Make sure our dashboard is selected
1. Click on "Pin"
1. Click on "Open dashboard"
1. Position the tile just below the first row
1. Click "Done" to exit the edit mode

## 2) Key request

1. In the main menu, open group "Digital Experience"
1. Click on "Session segmentation"
1. Locate the filter field at the top of the page
1. Click on an empty area inside the field
1. Type "converted"
1. In the drop-down list that appears, click on "Converted"
1. Select "Yes"
1. Scroll down to locate the user table
1. Click on the name of any user from the list ("Anonymous...")
1. Click on one of the user's sessions
1. Scroll down the list of actions to find 'click on "book journey for ..."'
1. Click on the arrow in the far right of the line to see the details of the action
1. Click on "Perform waterfall analysis" 
1. Click on the "/bookings/" request
1. Click on "View PurePath"
1. Click in the second "storeBooking" method (the one in the BookingService)
1. Click on the "storeBooking" link, in the Summary tab
1. Take a look at the top of the screen, 
1. Just below the name "Booking Service" you will see a Filter field
1. Click on the "X" in the box "Instance: com.dynatrace.easytravel...X" to remove the filter
1. Top-right menu, click on the three dots button "..."
1. Click on "Mark as key request"
1. Click on "Pin to dashboard"
1. Make sure our dashboard is selected
1. Click on "Pin"
1. Click on "Open dashboard"
1. Position the tile to the right of the funnel


# Hands-on 3

1. Navigate to "Settings"
1. Click on "Server-side service monitoring" menu group
1. Click on "Request attributes"

## 1) Capture "Revenue" request attribute
1. Click on "Define a new request attribute"
1. Type "Revenue" on "Request attribute name"
1. **Change "Data type" to "Double"**
1. Leave "First value" as it is
1. Do not change the checkboxes
1. Click on "Add new data source"
1. Change "Request attribute source" to "Java method parameter(s)"
1. Click on "Select method sources"
1. Type "backend" and choose the "com.dynatrace.easytravel.business.backend.jar" process group
1. Click on the process that appears
1. Click on "Continue"
1. Type "BookingService"
1. Click on "Search"
1. Select the class that was found
1. Click on "Continue"
1. Make sure "Use the selected class" is selected
1. Click on "Continue"
1. Type "storebooking" in the filter to find the method "public java.lang.String storeBooking(...)"
1. Mark its checkbox
1. Click on "Finish"
1. Change "Capture" value from "Class name" to "4: java.lang.Double"
1. Click "Save" in the method source section
1. Scroll up to the top of the page
1. Click "Save" at the top of the screen

## 2) Capture "Loyalty Status" request attribute
1. Click on "Define a new request attribute"
1. Type "Loyalty Status" on "Request attribute name"
1. Leave "Data type" as "Text"
1. Leave "First value" as it is
1. Do not change the checkboxes
1. Click on "Add new data source"
1. Change "Request attribute source" to "Java method parameter(s)"
1. Click on "Select method sources"
1. Type "backend" and choose the "com.dynatrace.easytravel.business.backend.jar" process group
1. Click on the process that appears
1. Click on "Continue"
1. Type "BookingService"
1. Click on "Search"
1. Select the class that was found
1. Click on "Continue"
1. Make sure "Use the selected class" is selected
1. Click on "Continue"
1. Type "checkloyalty" in the filter to find the method "private void checkLoyaltyStatus(...)"
1. Mark its checkbox
1. Click on "Finish"
1. Change "Capture" value from "Class name" to "2: java.lang.String"
1. Click "Save" in the method source section
1. Scroll up to the top of the page
1. Click "Save" at the top of the screen

## 3) Validate data collection

1. In the main menu, open group "Applications & Microservices"
1. Click on "Services"
1. Type "Request attribute" in the filter bar
1. Select either one of them ("Revenue" or "Loyalty Status")
1. You might have to wait 2 or 3 minutes and refresh
1. Click on "BookingService"
1. Click on "Response time"
1. Scroll down to the bottom of the page
1. Click the tab "Request attributes"
1. Expand the arrow at the right side of the row
1. Validate that both attributes are showing data

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

# Hand-on lab #7: Create a log event

## Step 1: Turn on problem pattern

easyTravel demo app has build-in problem patterns. In this lab, we will turn on "CreditCardCheckError500" pattern.
 
1. In the easyTravel configuration UI, click on the configuration icon (top right corner)
2. Enable "show problem patterns" option , a new tab ("Problem Patterns") will be added to the left main menu
3. In the problem pattern filter, search "creditcard"
4. Enable "CreditCardCheckError500" option
5. Wait for 2-3 minutes (or manually create a booking)

![RDP](../resources/lab07_01.jpg)

## Step 2: Create a log event based on problem pattern

1. In log viewer, select "error" facet from loglevel section
2. Search "credit card" keyword and verify the matching record
3. Select "com.dynatrace.easytravel.business.backend.jar easytravel (x\*)" in "dt.process.name" facet section
4. Toggle the "Advanced query" button on the top, copy the query (e.g. loglevel="error" AND content="credit card" AND dt.process.name="com.dynatrace.easytravel.business.backend.jar easytravel (x\*)") to a notepad
5. Go to settings (managed->settings), under "Log Monitoring", select "Log events"
6. Enter "Booking Error" in the summary field, copy your query from step 2.4
7. Enter a tile "Log event: credit card error", in the description field, enter "easyTravel problem pattern enabled"
8. Select "Error" as event type
9. Save
10. Wait 2-3 minutes, you should see a new problem is detected

it looks like this:
![RDP](../resources/lab07_02.jpg)

![RDP](../resources/lab07_03.jpg)

[Next Lab](../09_log_ingest_api/README.md)



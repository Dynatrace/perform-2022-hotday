# Hand-on lab #5: Create log metrics

## Step 1: Search by keyword

In this lab, we will create custom metric based on log query result. 

reset the log viewer, choose time selection as last one hour
search by content with "Credit Card number was verified successfully", make sure more than one match return


## Step 2: Create metric

Click on "Create metric" button at the top of search results
Enter "log.booking.success" in the key field, keep other fields default value. 
Add a dimention, choose "dt.process.name" from the dropdown
Click on "Save changes"
Wait for 2-3 minutes or manually create a booking from http://localhost:8079/

![RDP](../resources/lab05_01.jpg)



## Step 3: Create a graph with the newly created metric

From the left main menu, select "Explore data" under "Observe and explore" section
Select "log.booking.success" in the metric selection
Change "average" to "sum" in aggregation selection
Select "st.process.name" dimention from "Split by" option
Click on "Run query"
Verify the data


![RDP](../resources/lab05_02.jpg)


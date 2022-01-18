## Hands-on 2

### 1) Funnel query

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

### 2) Key request

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
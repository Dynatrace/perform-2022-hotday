## Hands-on 3

1. Navigate to "Settings"
1. Click on "Server-side service monitoring" menu group
1. Click on "Request attributes"

### 1) Capture "Revenue" request attribute
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

### 2) Capture "Loyalty Status" request attribute
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

### 3) Validate data collection

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
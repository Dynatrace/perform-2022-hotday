## Hands-on 1

### 1) User action naming
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

1. Scroll down to validate in "Preview your rule"
1. Click "Save"

### 2) Key user actions

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

### 3) Conversion goal

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

### 4) Create dashboard
1. In the main menu, open group "Observe and explore"
1. Click on "Dashboards"
1. Click on "Create dashboard"
1. Type "Mastering Business Transactions" as the name
1. In the tile filter, type "key"
1. Find the "Key user action" tile
1. Either drag and drop or double-click it
1. Select application "My web application" and user action "click on sign in"
1. Add a second key user action tile for the "book now" user action
1. In the tile filter, type "conversion"
1. Find the "Conversion goal" tile
1. Either drag and drop or double-click it
1. Select application "My web application" and conversion goal "Travel bookings"
1. At the top-right of the screen, click "Done"

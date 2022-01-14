## Auto Tagging Rule API

1. For reference open <a href="https://www.dynatrace.com/support/help/dynatrace-api/configuration-api/automatically-applied-tags-api/post-auto-tag" target="_blank">Auto-tags API</a> documentation

2. Go back to terminal and run dt api kit:

    ```bash
    node index.js
    ```

3. Choose *Create auto-tags*

4. ```bash
   Enter the name of the tag rule: production
   Choose one of the following to be tagged: APPLICATION
   Choose one of the following for the rule: CONTAINS
   Enter the value that will be compared to: Production
   ```   

    ![autotag](../../assets/images/autotag.png)

5. Go to history.log and verify your deployment

6. Try and build another rule for Dev. 
## Web Application API

1. For reference open <a href="https://www.dynatrace.com/support/help/dynatrace-api/configuration-api/rum/web-application-configuration-api/web-application/post-web-application" target="_blank">Web app API</a> documentation

2. Go back to terminal and run dt api kit:

    ```
    node index.js
    ```

3. Choose *Create new Web App*

4. Enter the following information

    * Enter the name of your app: Sockshop (Production)
    * Choose RUM enabled: yes/no
    * Choose RUM % captured: 0-100
    * Choose session replay enabled: yes/no
    * Choose % of session replay capture: 0-100


5. Go to the URL presented in the terminal and verify your deployment was successful<br>
    ![webapp](../../assets/images/webapp.png)

6. Try and build another application for Dev. Just use:


    * Enter the name of your app: Sockshop (Dev)


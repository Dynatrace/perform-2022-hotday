## Application Detection Rule API

1. For reference open <a href="https://www.dynatrace.com/support/help/dynatrace-api/configuration-api/rum/application-detection-configuration/post-rule" target="_blank">Application detection rule API</a> documentation

2. Go back to terminal and run dt api kit:

    ```bash
    node index.js
    ```

3. Choose *Create a app detection rule*

4. ```bash
   Choose an application for the detection rule: Sockshop (Production)
   Do you want to match Domain or URL? URL
   Choose one rule: CONTAINS
   What does the "URL" should match "CONTAINS"?: <your Sockshop front-end external IP saved before>:8080   

    ```
   
   If you don't have the URL, go to the bastion terminal and run: 
    ```bash
    kubectl get services -o wide --namespace production
    ```
    And copy front-end url adding HTTP://your external-ip:8080<br>
    ![appDetect](../../assets/images/appDetect.png)

5. Go to history.log and verify your deployment

6. Try and build another application for Dev . Just use dev URL:

    ```bash
    What does the "URL" should match "CONTAINS"? HTTP://your external-ip:8080
    ```
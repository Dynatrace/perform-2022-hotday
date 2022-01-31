## Generate Token via API (Token Management) (HOT exercise #2)

Using Dynatrace API, you will generate a Token with a wide-spread scope
<br>
<br>
    **NOTE/DISCLAIMER:** 
    <br>
    For training purpose only ...DON'T DO THIS IN YOUR ENVIRONMENTS. 

1. Go to your browser and visit our Perform 2022 HOT day repo in github: 

    <a href="https://github.com/Dynatrace/perform-2022-hotday" target="_blank">Perform 2022</a>
    

2. Click on Code and copy the URL under the clone HTTPS tab:

    ![gitClone](../../assets/images/gitClone.png)

 browser 


2. Go back to your SSH client or Environment terminal in your browser and clone perform repo by typing in the terminal

    ```
    git clone https://github.com/Dynatrace/perform-2022-hotday.git
    ``` 

3. Access cloud_automation_programmability_with_Dynatrace_API/dt-api-kit directory

    ```
    cd cloud_automation_programmability_with_Dynatrace_API/dt-api-kit
    ```

5. Install npm packages:

    ```
    npm install
    ```

6. Run generateToken.js:

    ```
    node generateToken.js
    ```

7. Follow the instructions and enter the requested information:

    ![tokenPrompt](../../assets/images/tokenPrompt.png)

    ```
    Enter master token: (copied earlier)
    tenantURL (note: keep the last / on the url): https://xxxx.sprint.dynatracelabs.com/
    token Name: hot2022
    Expiration days: 5
    ```

8. Verify that .env and TOKEN.log have been created:

    ```
    cat ../TOKEN.log
    ```

    ```
    cat .env
    ```

9. Verify that the token you generated via API is showing in your tenant (Settings >> Access Tokens)

    ![tokenGenerated](../../assets/images/generatedToken.png)
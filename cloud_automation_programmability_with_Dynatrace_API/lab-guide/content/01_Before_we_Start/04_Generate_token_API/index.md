## Generate Token via API (Token Management) (HOT exercise #1)

Using Dynatrace API, you will generate a Token with a wide-spread scope
<br>
<br>
    **NOTE/DISCLAIMER:** 
    <br>
    For training purpose only ...DON'T DO THIS IN YOUR ENVIRONMENTS. 

1. Go to your browser and visit our Perform 2022 HOT day repo in github: 

    <a href="https://github.com/Dynatrace/perform-2022-hotday" target="_blank">Perform 2022</a>
    

2. Click on Code and copy the URL under the clone HTTPS tab:

    ![gitClone](../../assets/images/gitclone.png)


3. Go back to your SSH client or Environment terminal in your browser and clone perform repo by typing in the terminal

    ```
    git clone https://github.com/Dynatrace/perform-2022-hotday.git
    ``` 

3. Access cloud_automation_programmability_with_Dynatrace_API/dt_api_helper directory

    ```
    cd perform-2022-hotday/cloud_automation_programmability_with_Dynatrace_API/dt_api_helper/
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
    tenantURL: https://xxxx.sprint.dynatracelabs.com/
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

9. Verify that the token you generated via API is showing in your tenant (Access Tokens)

    ![tokenGenerated](../../assets/images/generatedToken.png)
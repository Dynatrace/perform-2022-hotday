## Generate Token via API (Token Management)

Using Dynatrace API, you will generate a Token with a wide-spread scope
    **NOTE/DISCLAIMER** For training purpose only ...DON'T DO THIS IN REAL ENVIRONMENTS

1. Go back to your lab Environment details and either use your preferred SSH client or just click on *Open terminal* to open from the browser 

    ![bastion](../../assets/images/bastion.png)

2. Clone perform repo by typing in the terminal
    ```bash
    git clone <perform repo>
    ``` 
3. Access cloud_automation_programmability_with_Dynatrace_API directory
    ```bash
    cd automation_programmability_with_Dynatrace_API
    ```

4. Access dt-api-kit directory: 
    ```bash
    cd dt-api-kit
    ```

5. Install npm packages:
    ```bash
    npm install
    ```

6. Run generateToken.js:
    ```bash
    node generateToken.js
    ```

7. Follow the instructions and enter the requested information:

    ![tokenPrompt](../../assets/images/tokenPrompt.png)

    ```bash
    Enter master token: (copied earlier)
    tenantURL (note: keep the last / on the url): https://xxxx.sprint.dynatracelabs.com/
    token Name: hot2022
    Expiration days: 5
    ```
8. Verify that .env and TOKEN.log have been created:
    ```bash
    cat ../TOKEN.log
    ```
    ```bash
    cat .env
    ```
9. Verify that the token you generated via API is showing in your tenant (Settings >> Integration >> Dynatrace API)

    ![tokenGenerated](../../assets/images/generatedToken.png)
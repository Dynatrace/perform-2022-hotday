## Deploy OneAgent Operator

During this portion of our session, we will deploy our OneAgent operator with our default configuration.

1. In Dynatrace University, under your HOT session event, go to "Environments" tab and open the terminal for your EKS bastion host or copy the information to open an ssh session in your preferred ssh client.

    ![bastion](../../assets/images/bastion.png)

2. While in the "Environments" tab, click on "View Environment" and use the information to login to your tenant

    ![labDetails](../../assets/images/labDetails.png)

   ****NOTE: If you are logged in to your own Dynatrace tenant, ensure you logout before STEP 2 or open browser in incognito/private mode so you can login to your Dynatrace HOT environment.*

3. Go to Deploy Dynatrace >> Start Installation >> Kubernetes

    When you get prompt to the "kubernetes/Openshift" view, enter the following information as shown in the screenshot: 

    1. Name: *HOT-k8s*<br>
    2. Platform: *Kubernetes*<br>
    3. Click on *Create Tokens*<br>
    4. Click on *Copy*

    ![dtOperator](../../assets/images/dtOperator.png)

4. Once you copy the command on the clipboard, paste it on your terminal cli and press Enter.

    ![terminal](../../assets/images/terminalOperator.png)

5. Let Dynatrace do it's magic!!!!

6. Verify that Dynatrace OneAgent operator has been successfully deployed

    * Check Smartscape
    * Check Kubernetes dashboard
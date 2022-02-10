## Synthetic API

1. For reference open <a href="https://www.dynatrace.com/support/help/dynatrace-api/environment-api/synthetic/synthetic-monitors/post-a-monitor" target="_blank">Synthetic API</a> documentation

2. Go back to terminal and run dt api kit:

    ```bash
    node index.js
    ```

3. Choose *Deploy Synthetic Monitors*

4. When you get prompted to enter the information, use the following:
   
    * Choose one of the following to deploy: Homepage (browser)
    * Give your synthetic script a name: Homepage (Single Page)
    * Enter URL (ex. http://xxxx.us-west-2.elb.amazonaws.com:8080/): HTTP://your-external-ip:8080
    * Enter the environment tag (ex. production, dev): production   


5. Repeat steps 3 and 4 for:<br> 
    * Add to cart: "Add to Cart (MultiStep Transaction)" and<br> 
    * Cart API: "Carts API Check"

    ![synthetic](../../assets/images/synthetic.png)

6. Go to the URL presented in the terminal and verify your deployment was successful

This is an example of the desired outcome:

![synthetics](../../assets/images/syntheticOutput.png)
## Deploy SockShop App

You will deploy SockShop app in EKS

1. Go to SockShop directory 
    ```bash
    cd sockshop/
    ``` 

2. If sockshop.sh and loadgen.sh are non-executable, 

    ![execMod](../../assets/images/nonexec.png)
    
    then change mod:
    ```bash
    chmod +x deploy-sockshop.sh deploy-loadgen.sh
    ``` 

3. Deploy SockShop 
    ```bash
    ./deploy-sockshop.sh
    ```

4. After it finishes deployment, check front-end and carts External IPs
    ```bash
    kubectl get services -o wide --namespace production
    ```

5. Save front end (port 8080) and carts (port 80) external IPs
    ```bash
    node generateToken.js
    ```
    ![externalIPs](../../assets/images/externalIPs.png)

6. Open browser and test http://front-end-EXTERNAL-IP:8080 and http://carts-EXTERNAL-IP:80 


    ![cartsURL](../../assets/images/cartsURL.png)
    
    ![sockshopURL](../../assets/images/sockshop.png)

    
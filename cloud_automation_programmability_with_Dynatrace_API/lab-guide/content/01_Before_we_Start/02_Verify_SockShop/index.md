## Verify Sockshop Apps are running

You might've notice that there was not much to see. We need to make sure Sockshop apps are deployed and running.

Run the following command line in the terminal and verify that you have at least "loadgen", "dev", and "production" namespaces:

        kubectl get namespaces

![namespaces](../../assets/images/namespaces.png)

If they don't show up, perform the following:

        cd sockshop

Run the following command:

        ./deploy-sockshop.sh

After it has been deployed, verify again that the namespaces show up with the following command:

        kubectl get namespaces

Once you have verified that the namespaces exist, run the following commands on your terminal cli:

        kubectl -n production rollout restart deploy
        
        kubectl -n dev rollout restart deploy


1. Verify SockShop production app is running

   For this step, we will run the following commands:

    * kubectl get services -o wide --namespace production

    ![externalIPs](../../assets/images/externalIPs.png)

    * Copy EXTERNAL-IP for both front-end and carts as we will be using them in future activities.
    
    * Test that your prod app is reacheable on http://front-end-EXTERNAL-IP:8080 and http://carts-EXTERNAL-IP:80

2. Repeat step 1 for dev


When you test your URls, the outcome should look like the following: 

CARTS VIEW:

   ![cartsURL](../../assets/images/cartsURL.png)
    <br>

SOCKSHOP APP VIEW:

   ![sockshopURL](../../assets/images/sockshop.png)
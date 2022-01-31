## Verify Sockshop Apps are running

You might've notice that there are no services. We need to restart SockShop application.

For this, run the following commands on your terminal cli:

        kubectl -n production rollout restart deploy
        
        kubectl -n dev rollout restart deploy

1. Verify SockShop production app is running

   For this step, we will run the following commands:

    * kubectl get services -o wide --namespace production

    ![externalIPs](../../assets/images/externalIPs.png)

    * Copy EXTERNAL-IP for both front-end and carts as we will be using them in future activities.
    
    * Test that your prod app is reacheable on http://front-end-EXTERNAL-IP:8080 and http://carts-EXTERNAL-IP:80

2. Repeat step 1 for dev

    CARTS VIEW:

    ![cartsURL](../../assets/images/cartsURL.png)
    <br>

    SOCKSHOP APP VIEW:

    ![sockshopURL](../../assets/images/sockshop.png)
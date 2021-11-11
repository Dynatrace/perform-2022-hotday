# Installing the Dynatrace Operator

We've provided an Kubernetes cluster running our easyTravel demo application. We'll need to deploy the Dynatrace Operator to fully monitor our K8s cluster. The Dynatrace Operator will deploy monitoring to all parts of Kubernetes. The operator also deploy's containerized Active Gates which will be used for OneAgent Traffic routing and Monitoring the Kubernetes cluster APIs.

## Step 1: Verify DTU Environment

1. Use the browser terminal or any SSH client to connect to your bastion. Run kubectl version to verify the k8s cli is installed.

    ```
    kubectl version
    ```


## Step 2. Deploy Dynatrace Operator

1. Sign into your provided SaaS tenant. Navigate to `Deploy Dynatrace` and select `start installation`. Select `kubernetes` and enter the connection name `perform`. Click create tokens to populate the tokens. All other switches can be left default. 

    ![K8s Deploy](../resources/K8s%20Deploy.png)

2. Copy the command generated from dynatrace
    ![Opeartor install command](../resources/OperatorCommand.png)

3. Inside of your Dynatrace University environment you'll find a terminal to your bastion host. Execute the copied command on your bastion host to install the Dynatrace Operator.

4. Once the installation is complete, check your Dynatrace tenant for succesful agent connections. On the left hand navigation panel select `Deployment Status` under the `manage` section.

## Step 3. Verify Kubernetes Cluster Monitoring

1. Using the left-hand navigation panel, select `infrastructure` and `kubernetes`. Verify you're cluster is connected and you're receving data. 
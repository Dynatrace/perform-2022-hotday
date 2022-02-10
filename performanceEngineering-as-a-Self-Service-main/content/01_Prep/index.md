## Introduction

## Welcome to Dynatrace HotDay

Today we will cover how performance engineers can leverage Dynatrace thoughtout the CI/CD lifecycle.

During this course you will learn:

1. Load Test setup and Analysis 
1. Dynatrace SLOs
1. Integrating Jmeter / Load Test Harness
1. Automated Performance testing
1. SLI/SLO Dashboards
1. Dynatrace Cloud Automation
1. Dynatrace Release Monitoring
1. Release Analysis 

<details>
  <summary>Projects used for this Session</summary>

- [Keptn](https://keptn.sh/)
- [Jenkins Library for Keptn](https://github.com/keptn-sandbox/keptn-jenkins-library)
- [Order Overview](https://github.com/dthotday-performance/overview)
- [SockShop](https://github.com/keptn/examples)
- [EasyTravel](https://github.com/Dynatrace/easyTravel-Docker)
- [Jmeter Plugin](https://github.com/dynatrace-oss/jmeter-dynatrace-plugin)
- [KIAB](https://github.com/keptn-sandbox/keptn-in-a-box)
- [Jmeter Service](https://github.com/keptn/keptn/tree/master/jmeter-service#workloads)

</details>

<hr>

### How can you access your lab instance?

1. Access your Dynatrace Tenant, from the Environments tab
2. Go to "Dashboards"
3. open the "☁ Autonomous Cloud Concepts with Keptn" Dashboard.
4. Select link "🌐 KeptnInABox"

<img src="../../assets/images/autonomous-cloud.png" width="500"/>

<details><summary>If the link doesn't work...</summary>

You can also find the ip address to the lab homepage by loggining into your EC2 instance with ssh from the Environments tab.
  
Then run the following from the command prompt.

```bash
#: less +F /tmp/install.log
```

Get the URL for lab from the log output.

<img src="../../assets/images/KIAB_info.png" width="500"/>
  
</details>

Welcome to KIAB.

<img src="../../assets/images/KIAB.png" width="500"/>

<hr>

## Validating the projects in the keptn bridge

Click on the "Bridge" link. This will open the keptn bridge.
You should see the preloaded projects.

<img src="../../assets/images/bridge01.png" width="500"/>

By examining the Bridge, we can determine if we need to trigger a deployment for any of the
application services.

You may need to run several pipelines to complete the deployments of the applications but before we do that we need to adjust our dashboard in Dynatrace which contains the critiera some of these tests are checking against.

<hr>

## Validate some Enviornment Settings

### Check the Host is tagged. 
You should see these tags,

<img src="../../assets/images/hosttags.png" width="500"/>

<details><summary>If you do not see these tags follow these steps</summary>

1. Login to your EC2 instance via ssh, from the Environments tab
2. Navigate to "keptn-in-a-box/resources/dynatrace/scripts" directory

    ```bash
        #: cd keptn-in-a-box/resources/dynatrace/scripts
    ```   
3. run this command.

    ```bash
        #: sudo ./hosttag.sh
    ```
After you have run this script, just wait a few minutes, then verify the tags have been added to the host.
</details>

### Check Calculated service metrics

Go to Dynatrace.

Navigate to **"Settings>Server-side service monitoring>Calculated service metrics"**

You should see 4 calculated service Metrics:

<img src="../../assets/images/lab_1_calculated_service_metrics.png" width="500"/>

<details><summary>If you do not see these tags perform these steps</summary>

- Go to your lab environment tab
- Click open terminal to ssh into your EC2 instance.
- navigate to 

```bash
  #: cd ~/keptn-in-a-box/resources/dynatrace/scripts
```

- Run the following command
```bash
  #: sudo ./createTestStepCalculatedMetrics.sh CONTEXTLESS keptn_project simpleproject
```

</details>

### Adjust Management zone
We need to add host criteria to the "Keptn: sockshop staging" management zone which will be set as a filter in our dashboard. 

Open Dynatrace and navigate to **"Settings>Preferences>Management zones"**

Find the **"Keptn: Sockshop staging"** management zone.

We need to add a rule to capture the host and process metrics.

Use these settings to create the Rule.

- Rule Applies to "Hosts"
- Conditions: Host tags equals [Environment]kiab
- Select checkbox "Apply to processes running on matching hosts

   <img src="../../assets/images/ss_mz.png" width="500"/>

- Click **"Preview"**
- Click **"Create rule"**

### Clone dashboard and set default management zone

Go to **"Dashboards"** and open the **"KQG;project=sockshop;stage=staging;service=carts"** dashbaord.

- Click `...` in the top right corner and click `Clone`
- Click **"Edit"**
- Remove **"-cloned"** from the title
- Select **"Settings"**
- Pick **"Keptn: sockshop staging"** for the Default Managment zone
- Click **"Done"**
- Validate you see data in each tile

Now we can start running the pipelines in Jenkins that we see failed in the Keptn Bridge...

<hr>

## Runing Jenkins Pipelines

Click on **"Jenkins"** from the lab homepage

Login to Jenkins with the following credentials

* username = keptn
* password = keptn

<img src="../../assets/images/Lab_1_Jenkins_Log_In.png" width="400"/>

First you will just select "Install Suggested Plugins"

<img src="../../assets/images/jenkins-install-plugins.png" width="500"/>

Now we will kick off the Pipeline **01-deploy-order-application** to build out the application.

After selecting the pipeline click **"build"**

<img src="../../assets/images/Lab_1_deploy_order_application_1.png" width="500"/>

The initial build will fail, this is normal, becasue the pipeline files are pulled from a github repo.

Refresh the page, you should then see "Build with parameters".

Initially, the "order" service may fail, in the "DEPLOY_TO" option, we can select order.
This allows us to deploy only the "order" service.

<img src="../../assets/images/buildwithparams.png" width="500"/>

We now have different options for each pipeline build.
Instead of documenting each part here, we will walk through a few scenerios.

<hr>

## Validating your Enviornment 

Additionally, we may need to deploy additional application services.
By examining each project in the Bridge, we can determine which application services need to be deployed.

Let's take a little time to do this now.

Each Application deploymnet has it's own pipeline. With the help of an instructor, select the appropriate 
pipeline and build out the necessary services.

## Order App Overview

This application was built for demonstations of Dynatrace.  Here is the frontend.

<img src="../../assets/images/orders.png" width="400"/>

The overall application is made up of four Docker components: a frontend web UI and 3 backend services.  Once monitored by Dynatrace, a multi-tier service flow will be available as shown below.

<img src="../../assets/images/dt-call-flow.png" width="500"/>

#### Pre-built Docker Images

The dt-orders application has pre-built problems programmed within different versions.  See source in the [dt-orders repo](https://github.com/dt-orders).  Each version for each service, has pre-built docker images that are published to [dockerhub](https://hub.docker.com/u/dtdemos).

This is a summary of the versions followed by a description of the problem scenarios.

<details><summary>Problem Scenarios List</summary>

| Service  | Branch/Docker Tag | Description |
|---|:---:|---|
| frontend | 1.0.0 | Normal behavior |
| catalog-service | 1.0.0 | Normal behavior |
| customer-service | 1.0.0 | Normal behavior |
| order-service | 1.0.0 | Normal behavior |
| customer-service | 2.0.0 | High Response time for /customer/list.html |
| order-service | 2.0.0 | 50% exception for /order/line URL and n+1 back-end calls for /order/form.html |
| customer-service | 3.0.0 | Normal behavior |
| order-service | 3.0.0 | Normal behavior |

</details>

<br>

<details><summary>Problem Scenarios Details</summary>

### Problem Scenarios details

#### Deploy dtdemos/customer-service:2.0.0

<img src="../../assets/images/usecase1.png" width="500"/>

### Deploy dtdemos/order-service:2.0.0 

Both these scenearios are enabled

<img src="../../assets/images/usecase2.png" width="500"/>

and...

<img src="../../assets/images/usecase3.png" width="500"/>

</details>

<hr>

## Examine Dynatrace 

Now lets take a look at what we have discovered in Dynatrace.

Open Dynatrace and navigate to **Hosts** in the menu and select the host.

### Let's examine all the proceses automatically discovered by the Dynatrace oneAgent.

<img src="../../assets/images/pre_host.png" width="400"/>

We can also see the processes for the order application.

<img src="../../assets/images/pre_processes.png" width="500"/>

Next we can examine the Transactions and Services.

Select **Transactions and Services** from the menu.

<img src="../../assets/images/pre_services.png" width="500"/>

You can also change the focus by using the _management zone_ filter.

Finally, we can also see how the KIAB configured Kubernetes cluster monitoring.

Select **Kubernetes** from the menu.

<img src="../../assets/images/pre_kube.png" width="500"/>

### Pre-configured items also include:

1. Dashboards
1. Request Attributes
1. Calculated Service Metrics
1. Management Zones
1. Automatically Applied Tags
1. Applications
1. Problem notification
1. Process and service naming rules

Due to to time constrainsts, we will visit each area as needed during the lab exercises.

## Final validation of envionrment

Validate each project stage has been properly deployed by navigating to the KIAB homepage then selecting each application overview link (except EasyTravel which will not be part of this lab).

<img src="../../assets/images/applinks.png" width="400"/>

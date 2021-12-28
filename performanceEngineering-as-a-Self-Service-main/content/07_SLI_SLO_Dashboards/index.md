# SLIs & SLOs via Dynatrace Dashboard

Based on user feedback we learned that defining custom SLIs via the sli.yaml and then defining SLOs via slo.yaml can be challenging as one has to be familiar with the Dynatrace Metrics v2 API to craft the necessary SLI queries. As dashboards are a prominent feature in Dynatrace to visualize metrics, it was a logical step to leverage dashboards as the basis for Keptn's SLI/SLO configuration.

## Use Cases

<img src="../../assets/images/sli_use_cases.png" width="500"/>

## SLI/SLO Dashboard Layout and how it generates SLI & SLO definitions

Here is a sample dashboard for our simplenode sample application:

<img src="../../assets/images/sli_DB_example.png" width="500"/>

And here is how the individual pieces matter:

### 1. Name of the dashboard

```
project=<project>,service=<service>,stage=<stage>
```

### 2. Management zone Filter

If you are building a dashboard specific to an application or part of your environment, it is a good practice to set a default management zone filter for your dashboard.

### 3. Markdown with SLO Definitions

The dashboard is not only used to define which metrics should be evaluated (list of SLIs), it is also used to define the individual SLOs and global settings for the SLO, e.g., Total Score goals or Comparison Rules. These are settings you normally have in your slo.yaml. To specify those settings simply create a markdown that contains name-value pairs like in the example dashboard.

```
KQG.Total.Pass=90%;KQG.Total.Warning=75%;KQG.Compare.WithScore=pass;KQG.Compare.Results=1;KQG.Compare.Function=avg
```

### 4. Tiles with SLI definition

Similar to the markdown, each tile can define several configuration elements. The only mandatory is sli=sliprefix. Here a couple of examples of possible values. It actually starts with a human readable value that is not included in the analysis but makes the dashboard easier readable:

```
Test Step Response Time;sli=teststep_rt;pass=<500;warning=<1000;weight=2
Process Memory;sli=process_memory
Response time (P50);sli=svc_rt_p95;pass=<+10%,<500
```

### 5. SLI Dashboard also supports SLO tiles and Problem Tiles.
### 6. USQL Tiles

<hr>

## This all seems a little complex.

Good news, for the lab exercise, we have created a SLI dashboard template.

First we need to tell keptn what Dashboard to use for the evaluation.

### Environment setup steps:
1. open ssh
1. validate the environment variables
    1. execute   
        ```bash
            #: env
        ```
    we are looking for these environment variables: 

        1. DT_TENANT
        2. DT_API_TOKEN
        3. KEPTN_DOMAIN

    If These are not set, then we will need to set them, A instructor will help you find these values.
    1. execute
        ```bash
            #: export DYNATRACE_TENANT=<DYNATRACE_TENANT>
            #: export DT_API_TOKEN=<DT_API_TOKEN>
            #: export KEPTN_DOMAIN=<KEPTN_DOMAIN>
        ```    

1. Next, navigate to this directory, ~/keptn-in-a-box/resources/dynatrace/scripts
1. Run the script setdbenv.sh
    1. execute
        ```bash
            #: ./setdbenv.sh 
        ```
<hr>

## Next

Go to your Dynatrace tenant and click on "Dashboards".

The Dashbaord we are looking for is labeled "KQG;project=sockshop;stage=staging;service=carts"

Some of the tiles may be blank.

<img src="../../assets/images/sli_kqg_db.png" width="500"/>

## Dynatrace Configuration 

We need to create a rule on the management zone that keptn created.

In the Dynatrace UI, navigate to "Settings>Preferences>Management zones"
Now, locate the "Keptn: sockshop staging" management zone.

Create this rule on the management zone.

<img src="../../assets/images/mz_rule.png" width="500"/>

### Next

We need to configure the SLO tiles on the Dashboard.

## configure SLO Tile steps will go here.....


### Now, we can execute the evaluation

Go to Jenkins and run the "06-qualitygate-sli-dashboard".
You should be familiar with how this is done.
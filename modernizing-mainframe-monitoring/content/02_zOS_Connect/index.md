## Hands-on: z/OS Connect

In this module you will learn how to to define a z/OS Connect Service using IBM z/OS Explorer.

The goal is to create a z/OS Connect Service and monitor it with the Dynatrace OneAgent for z/OS Java.


### Step 1: Create z/OS Connect Service using z/OS Explorer
- Open z/OS Explorer by double clicking the `zosxplorer` icon on the Desktop

![z/OS Explorer](../../assets/images/zosexplorer.png)

- Click on `Add` next to the `Credentials` pane

![Add Credentials](../../assets/images/Add_Credentials.png)

- Provide your Credentials and click `OK`

![Provide Credentials](../../assets/images/Provide_Credentials.png)

- Select `DTVD` and click on `Edit`

![Edit Connection](../../assets/images/Edit_Connection.png)

- Provide your own User ID in the `Default User ID` field and click`OK`

![Default User](../../assets/images/Change_DefaultUser.png)

- Select `ZOSCSRV` entry in the `z/OS Connect EE Servers` pane and choose `Connect`

![Connect](../../assets/images/Connect_ZOSSRV.png)

- Select `Use Existing Credentials` and select the `DTVD` credentials you previosly created

![Use Existing Credentials](../../assets/images/Signon_ZOSSRV.png)
   
- Provide your Credentials and click `OK`

![Provide Credentials](../../assets/images/Signon.png)
   
   
### Step 2: Create "Host Health" Chart
- Drag & drop `Host health` tile into your Dashboard 
- Keep all defaults
- Click `Done`


### You've arrived
- You have successfully created a z/OS Connect Service! 






## Hands-on: z/OS Connect

In this module you will learn how to to define a z/OS Connect Service using IBM z/OS Explorer.

The goal is to create a z/OS Connect Service and monitor it with the Dynatrace OneAgent for z/OS Java.


### Step 1: Establish Connection to z/OS Connect Server

1. Open z/OS Explorer by double clicking the `zosxplorer` icon on the Desktop

![z/OS Explorer](../../assets/images/zosexplorer.png)

2. Click on `Add` next to the `Credentials` pane

![Add Credentials](../../assets/images/Add_Credentials.png)

3. Provide your Credentials and click `OK`

![Provide Credentials](../../assets/images/Provide_Credentials.png)

4. Select `DTVD` and click on `Edit`

![Edit Connection](../../assets/images/Edit_Connection.png)

5. Provide your own User ID in the `Default User ID` field and click`OK`

![Default User](../../assets/images/Change_DefaultUser.png)

6. Select `ZOSCSRV` entry in the `z/OS Connect EE Servers` pane and choose `Connect`

![Connect](../../assets/images/Connect_ZOSSRV.png)

7. Select `Use Existing Credentials` and select the `DTVD` credentials you have previously created

![Use Existing Credentials](../../assets/images/Signon_ZOSSRV.png)
   
8. Provide your Credentials and click `OK`

![Provide Credentials](../../assets/images/Signon.png)
   
   
### Step 2: Create Service in IBM z/OS Explorer

- Switch the perspective to `z/OS Connect Enterprise Edition`
1.	From the main menu, select `Window > Perspective > Open Perspective > Other`. The Open Perspective wizard opens.
2.	Select `z/OS Connect Enterprise Edition`

![Perspective](../../assets/images/perspective.png)

- Create a z/OS Connect EE service project in the z/OS Connect Enterprise Edition perspective and define the request and response service interfaces.

1.	Select `File > New > Project`. The New Project wizard opens

![New Project](../../assets/images/newproject.png)

2.	Select `z/OS Connect Enterprise Edition > z/OS Connect EE Service Project` and click `Next`

![Service Project](../../assets/images/serviceproject.png)

3.	Enter project name `EDUnnn` (`nnn` is your three digit ID)
4.	In the Project type drop-down, select `CICS Channel Service` 
5.	Optionally type in a description and click `Finish` (a service template is created with errors by default)

![Name](../../assets/images/projectname.png)

![Definition](../../assets/images/Definition.png)

6.	Select `Configuration` tab and enter `Conn7nn` (`Conn7nn` is the unique connection ID of your CICS region, `7nn` is your three digit ID) 
Note: This connection ID should match with your `<zosconnect_cicsIpicConnection>` entry in `server.xml` configuration in z/OS Connect set up. 

![Configuration](../../assets/images/Configuration.png)

7.	Switch to the `Definition` tab to create Service interface definitions
8.	Enter `EDUCHAN` in the Program text box ( `EDUCHAN` is an IBM sample COBOL CICS Application defined and installed in your CICS region)
9.	Click on button `Create Service Interface`

![CreateServiceInterface](../../assets/images/CreateServiceInterface.png)

10.	Type in Service name `EDUnnnRequest` for Request service definition and click `OK`

![EDU731Request](../../assets/images/EDU731Request.png)

11.	Rename the Channel and Container fields by double-clicking on each entry
Channel -> `EDUCHANNEL`
Container1 -> `INPUTDATA`
For Container1, select `CHAR in the datatype field`

![Channel](../../assets/images/INPUTDATA.png)

![Request](../../assets/images/SIRequest.png)

12.	Save Service Interface `EDUnnnRequest` using `File->Save` or `Ctrl-S` or by clicking on the Disk icon of `z/OS Explorer`
13.	Switch to tab `EDUnnn Service` tab and create another service interface by clicking on button `Create Service Interface`
14.	Create a response service with name `EDUnnnResponse`
15.	In the Service interface editor, create three containers with the following names and types for response service. Use the add icon at the top to add more containers

![Add Container](../../assets/images/AddContainer.png)

a.	Container Name: `CICSRC`     Container Type: `BIT`
b.	Container Name: `OUTPUTDATA` Container Type: `CHAR`
c.	Container Name: `CICSTIME`   Container Type: `CHAR`

![Response](../../assets/images/SIResponse.png)

16.	Save Service Interface `EDUnnnResponse` using `File->Save` or `Ctrl-S` or by clicking on the Disk icon of `z/OS Explorer`
17.	Switch to `EDUnnn` Service window
18.	Select your new Request and Response service in the dropdown

![Service](../../assets/images/EDU731Service.png)

19.	Save `EDUnnn` Service using `File->Save` or `Ctrl-S` or by clicking on the Disk icon of `z/OS Explorer`


### Step 3: Deploy Service in z/OS Connect

Note: ensure you have a z/OS Connect Host connection established to DTVD using your credentials.

1.	Right click on your `EDUnnn` project in the Project Explorer pane
2.	Select `z/OS Connect EE > Deploy Service to z/OS Connect EE Server`

![Deploy](../../assets/images/Deploy.png)

3.	Click `OK` on the Deploy Service pop-up

![Deploy OK](../../assets/images/DeployOK.png)

![Deploy Success](../../assets/images/DeploySuccess.png)

This will deploy an `EDU737.sar` file in this path: /var/zosconnect/v3r0/servers/defaultServer/resources/zosconnect/services in DTVD

Note: Your new service will be available, when z/OS Connect has been refreshed. This will be done by the instructors.


### You've arrived
- You have successfully defined and deployed a z/OS Connect Service for program `EDUCHAN`! 






## Prepare your workspace

Welcome to the **Automate and integrate OpenTelemetry with Dynatrace lab**.

Before we begin, your workspace must get prepared.


### Validate that your Dynatrace Environment is accessible

Let's start with accessing the Dynatrace Environment that has been reserved for you.

![Access your environment](../../assets/images/access_environment.png)

### Validate that your development host is accessible

In addition to that a development machine has been provisioned for you.

![Development Machine](../../assets/images/ubuntu.png)

This machine can get accessed with your browser. Open a new browser window and paste in the IP Address into the address line. You should see the login screen now. Enter the password that has been provided for you alongside with the IP Address.

![Code Server Login](../../assets/images/code-server-login.png)

We are using Visual Studio Code Server today in order to build and launch applications. After successful login it presents the ``workspace`` folder for you.

![Code Server Login](../../assets/images/vs-code-first.png)

A small popup may become visible at the bottom right of your screen, notifying you that the environment is getting accessed via an insecure domain. You can safely click on the ``I understand`` button here. None of the examples of today contain any confidential information.

#### Open a terminal tile in Visual Studio Code
Your development environment also provides access to the command line of your host. Click on the Menu Button ![New Terminal](../../assets/images/menu-button.png) in the top left corner and select

```Terminal > New Terminal```

![New Terminal](../../assets/images/new-terminal.png)

As a result a terminal tile will appear at the bottom of the screen.

![New Terminal 2](../../assets/images/new-terminal-2.png)

You current directory within this bash terminal should be ``~/workspace`` at this point.

### Install OneAgent
Let's install OneAgent now. In your Dynatrace Environment navigate to ``Deploy Dynatrace`` and choose ``Linux`` for the platform. Create a PaaS Token and follow the instructions for downloading the installer.

![Deploy Dynatrace](../../assets/images/deploy-dynatrace.png)

![Deploy Dynatrace](../../assets/images/deploy-dynatrace-2.png)

Don't forget to invoke the installer with root permissions. You may get asked for a password - it's the same on you used to access this host initially.

```bash
sudo sh Dynatrace-OneAgent-Linux-1.231.186.sh
```

![Deploy Dynatrace](../../assets/images/deploy-dynatrace-3.png)

We don't need the installer anymore, so let's delete it. 
```bash
rm Dynatrace-OneAgent-Linux-1.231.186.sh
```
on the command line.

Let's verify that OneAgent is indeed reporting to your Dynatrace Environment.

![Deploy Dynatrace](../../assets/images/hosts.png)

### Check out source code
Now let's check out the source code of the application we're using today. Enter the following command within your terminal tile.
```bash
git clone https://github.com/Dynatrace-Reinhard-Pilz/shopizer.git
```
![New Terminal 2](../../assets/images/git-clone.png)

### Prebuild the application
A new folder named ``shopizer`` will be available after that. Change into that directory.
```bash
cd shopizer
```

![New Terminal 2](../../assets/images/cd-shopizer.png)

Next we're pre-building the application.
```bash
mvn clean install
```
This initial build will take a minute or two to complete.

![New Terminal 2](../../assets/images/mvn-clean-install.png)

### You have arrived!
At this stage your development machine is ready to run the applications we are going to use today.
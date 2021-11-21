# Step 1 - Environment Setup


## Machine Details

We each have a **Windows Virtual Machine** running on **AWS** for our labs.  

This machine will serve different functions:

* **Development machine**
    * In a real scenarion, this would usually be your workstation
    * It has `python 3.10`, `vscode`, `git`, `net-snmp` pre-installed for us
    * You don't need to use Windows to develop extensions
* **OneAgent Host**
    * For our labs, we want to test WMI Extensions on this OneAgent
    * You don't need the OneAgent on your development machine to develop extensions
* **Environment Activegate**
    * In a real scenario this would be a separate server, that can run remote extensions
* **SNMP Device**
    * A simulator is running on this machine, making it behave like a Palo Alto Firewall network device
    * In a real scenarion this would be a network applicance in your network
* **Prometheus Exporter**
    * There is a prometheus exporter exposing metrics from this machine
    * In a real scenario this would also be a remote machine in your network


## Install the OneAgent

1. Open `Firefox` or `Google Chrome`
2. Navigate to your `Dynatrace Tenant URL` and login
3. On the left menu, click `Manage` then `Deploy Dynatrace`
4. Click `Start Installation`, then `Windows`
5. Click `Create token` and `Download OneAgent installer`
6. `Run` the installer with all default options

## Install the Activegate

1. Open `Firefox` or `Google Chrome`
2. Navigate to your `Dynatrace Tenant URL` and login
3. On the left menu, click `Manage` then `Deploy Dynatrace`
4. Scroll down, click `Install Activegate`, then `Windows` 
5. Click `Create token` and `Download installer`
6. `Run` the installer with all default options


## Deployment and Customization

In this module you will learn how to deploy a Mainframe ActiveGate and zRemote and make the definitions on the Mainframe to connect an LPAR to this zRemote.

### Step 1: Open Dynatrace Tenant
1. Open the Dynatrace tenant provided to you
2. Login with the credentials provided to you

  ![Login](../../assets/images/Credentials.png)

### Step 2: Install the Mainframe ActiveGate
1. Select `Deploy Dynatrace` and click on `Install Active Gate`

  ![Install](../../assets/images/Install_AG.png)

2. Select `Windows`
3. Check `Route z/OS traffic to Dynatrace` (Step 1)!
4. Click on `Download Installer` (Step 2) OR Click on `Copy` and paste the download command into a DOS prompt, press `Enter`

  ![Installer](../../assets/images/Installer.png)
  
5. Wait for the download to finish (can take a while depending on the bandwidth)
6. Navigate to the folder containing the downloaded file in the DOS prompt (either your User directory or the Downloads folder)
7. `Copy` installation command from the Dynatrace Tenant (Step 3) 
7. Make sure, that the command contains parameter `ENABLE_ZREMOTE=true` after the exe! 
8. Make sure that the name of the `exe`-File is correct, before you hit `Enter` 
9. Install with the default settings
10. Click on `Show Deployment Status` after the Installation has been successful

  ![ActiveGate](../../assets/images/MF_AG_Details.png)

### Step 3: Prepare and start the zDC

Useful hints when using the X3270-Session:
* Right `<Control>` key submits a command
* `<Enter>` key moves the cursor to the next input field
* `<F3>` ... exit
* `<F7>` ... scroll up
* `<F8>` ... scroll down
* `<F10>` ... scroll left
* `<F11>` ... scroll right

1. Double click on the X3270 Session called `Perform` on the Desktop
2. Logon to ISPF with `logon <userid>` + `Right <Control>` (use the Userid and Password provided to you in the Cheat Sheet on the Desktop) 

  ![LogonISPF](../../assets/images/Logon_ISPF.png)

3. Type `ispf`

  ![ISPF](../../assets/images/ISPF.png)

4. Navigate to `3.4`

  ![3.4](../../assets/images/34.png)

5. Type `<userid>.**.ZDC*` as dataset mask and press `Enter` (`<userid>` is your personal User ID!)

  ![3.4](../../assets/images/ZDCSYSIN34.png)
  
6. Type `e` left to the dataset

  ![3.4](../../assets/images/34Edit.png)
 
7. Type `e` left to the member `ZDCSYIN1` to `edit` the member

  ![3.4](../../assets/images/34EditMember.png)
  
8. Edit the SYSIN for the zDC parameters - `<userid>.CI.R070300.ZDCSYSIN(ZDCSYIN1)`
9. Provide the IP-Address of your Mainframe ActiveGate and Port 8898 in the DTAGTCMD string
Note: the IP-Address is the one of your VM (shown in the titlebar of your RDP-Session)

  ![ZDCSYSIN](../../assets/images/ZDCSYSIN.png)
  
10. Keep all other parameters as they are 
11. Type `exit` in the Command line or just press the `F3` function key (this will save the file and exit from the edit session)

  ![Save](../../assets/images/SaveZDCSYSIN.png)

12. Press `F3` and `F3` to get to the Main screen
13. Type `<userid>.**.JCL` as dataset mask and press `Enter` (`<userid>` is your personal User ID!)

  ![3.4](../../assets/images/EditZDC.png)
 
14. Type `b` left to the dataset `<userid>.CI.R070300.JCL` to `browse` the dataset

  ![Browse](../../assets/images/BrowseZDC.png)

15. Press `F8` to page down
16. Submit the zDC JCL in `<userid>.CI.R070300.JCL(ZDCJCL1)`

  ![Submit](../../assets/images/SubmitZDC.png)

17. Press `F3`
18. Type `=s.st` in the Command Line

  ![SDSF](../../assets/images/SDSFInit.png)

19. Check in sdsf if the job `AFVDZnnn` is running by typing `pre AFVDZ*` in the Command line (this will display all processes starting with `AFVDZ`)

  ![SDSF](../../assets/images/SDSFPrefix.png)

20. Browse your zDC's job spool with command `s` (select) to check, if it has connected to the zRemote (your zDC is the one containing your three didgit ID, e.g. 731)

  ![Spool](../../assets/images/ZDCSpool.png)

21. If you find these messages in the spool, all should be good (just use command `f ZDC955L` to find the relevant messages and page up/down with `F7` and `F8`):

```
ZDC955L Dynatrace connection being processed ZDC-Job/ID:AFVDZ731/Z731           
ZDC958L Dynatrace INIT completed, ZDC AgentId received ZDC-Job/ID:AFVDZ731/Z731 
ZDC993I Opn1RFD:0008  /u/labuser/ci/7.3build/log/dt_ZLOCAL1_Z731_67175364.0.log 
```

### Step 4: Prepare CICS Region

1. Submit the CICS JCL in dataset `<userid>.CI.R070300.JCL (Cnnn5301)` (`<userid>` is your personal User ID and `nnn` is your three digit ID!)
2. Check in SDSF, if the job `HVDACnnn` is running
You can use command `=s.st` from anywhere in ISPF
You may use commands `owner <userid>` and `pre *` to display all jobs running under your userid

  ![SDSF](../../assets/images/sdsf.png)

3. Double click on the X3270 Session called `Perform` on the Desktop again to open a second session
4. Logon to CICS with `l HVDACnnn` (`nnn` is again your three digit ID)

  ![LogonCICS](../../assets/images/Logon_CICS.png)

5. Click on Keypad and `Clr Scrn`
6. Check the status of your CICS Agent using transaction `DTAX` in your CICS 

  ![DTAX](../../assets/images/DTAX.png)

7. CICS agent should be `Enabled`, `Agent ID` should contain a value and `zDC Name` should contain `Znnn` (`nnn` is your three digit ID)
8. Type command `conf` after `Option ===>`  

   ![ConfCmd](../../assets/images/confcommand.png)
 
9. This will show you the configured CICS agent settings

   ![Conf](../../assets/images/conf.png)

### Step 5: Prepare CICS Program `EDUCHAN`
1. Open a new X3270 session by double clicking the `Perform` icon and logon to CICS with `l HVDACnnn` (`nnn` is your theree digit ID)
2. Click on Keypad and `Clr`

3. Type `cemt s prog(EDUCHAN)` (this will display the current length and use count, after starting the CICS region it should all be zero)

  ![CEMT](../../assets/images/firstcemt.png)

4. Make a `newcopy` of the EDUCHAN program version by adding `ne` after `cemt s prog(EDUCHAN)` (the length should change because the program has been loaded)

  ![newcopy](../../assets/images/firstnewcopy.png)

5. Your `EDUCHAN` program version is active now

### You've arrived
You have successfully deployed and configured Dynatrace for z/OS! 

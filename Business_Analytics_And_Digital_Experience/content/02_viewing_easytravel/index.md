## Viewing EasyTravel

In this module, we will take what we've learned about how Real User Monitoring operates and see it in action

### Validating the Tag
- Open Console in your browser by hitting F12. From there, navigate to the Network tab

![browser_network_tab](../../assets/images/browser_network_tab.png)

- Visit the URL or IP in your Dynatrace university. Add :9080 at the end to ensure you’re loading the Angular version of easyTravel

- Once the site has loaded, search for ruxit in the network tab and validate it returns a 200 OK status. This is the Dynatrace RUM tag. It is loaded on entry into the site and then cached

![Tag_200_OK](../../assets/images/Tag_200_OK.png)

- Search for rb_ in your Chrome network tab. You should see 2-3 of these calls. These are the beacons that send the real user data back to Dynatrace after each interaction with the site that generates network activity

- Click on any one of the beacons to validate that the message being returned under Preview starts with OK

![Beacon_OK](../../assets/images/Beacon_OK.png)

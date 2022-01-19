# Push Email Alerts to Dynatrace

##  [Overview](https://github.com/geoteo/dt-push-email-alerts)

In the next few steps we will walk through the process of coding a simple python script in under 100 lines of code that scrapes a Gmail inbox for email alerts that we want pushed into Dynatrace.

## [dt-push-email-alerts](https://github.com/geoteo/dt-push-email-alerts)

1. Paste the following command into your terminal to clone the repo containing everything you need to get started.

    ```bash
    git clone https://github.com/geoteo/dt-push-email-alerts
    ```
    ![git_clone](https://github.com/geoteo/dt-push-email-alerts/blob/master/assets/git_clone.png?raw=true)

2. Change your working directory to the repo we just cloned and ensure you have the following.

    ```bash
    cd dt-push-email-alerts
    ```
    ![cd](https://github.com/geoteo/dt-push-email-alerts/blob/master/assets/cd.png?raw=true)

3. Using your favorite code editor open up the `secrets.py.template` and input the your personal tenant-specific information.

    ![secrets](https://github.com/geoteo/dt-push-email-alerts/blob/master/assets/secrets.png?raw=true)

4. Rename `secrets.py.template` to `secrets.py` by running the following command.

    ```bash
    mv secrets.py.template secrets.py
    ```
    ![mv](https://github.com/geoteo/dt-push-email-alerts/blob/master/assets/mv.png?raw=true)

5. Ensure you have the following python packages downloaded.

    ```bash
    python3 -m pip install --upgrade pip setuptools wheel
    ```

6. Open the `mail.py` script to view the code.

7. Review the logic starting with the `def mailConnect()` function.

    ```python
    def mailConnect():
        # Connect and login to IMAP mail server
        username = secrets.get('EMAIL')
        password = secrets.get('PASSWORD')
        mail_server = "imap.gmail.com"
        imap_server = imaplib.IMAP4_SSL(host=mail_server)
        imap_server.login(username, password)

        # Choose the mailbox (folder) to search (Case sensitive!)
        imap_server.select("INBOX")  # Default is `INBOX`

        # Search for emails in the mailbox that was selected.
        # First, you need to search and get the message IDs.
        # Then you can fetch specific messages with the IDs.
        # Search filters are explained in the RFC at:
        # https://tools.ietf.org/html/rfc3501#section-6.4.4
        search_criteria = "UnSeen"
        charset = None  # All
        respose_code, message_numbers_raw = imap_server.search(charset, search_criteria)
        console.success(f"Gmail IMAP search response: {respose_code}")  # e.g. OK
        message_numbers = message_numbers_raw[0].split()

        # Fetch full message based on the message numbers obtained from search
        for message_number in message_numbers:
            _, msg = imap_server.fetch(message_number, "(RFC822)")
            # print(f"Fetch response for message {message_number}: {response_code}")
            # print(f"Raw email data:\n{msg[0][1]}")

            # Parse the raw email message in to a convenient object
            message = email.message_from_bytes(msg[0][1])

            console.info(f'From: {message["from"]}')
            console.info(f'To: {message["to"]}')
            console.info(f'Subject: {message["subject"]}')
            console.info(f'Date: {message["date"]}')

            for part in message.walk():
                if part.get_content_type() == "text/plain":
                    body = part.get_payload(decode=True)
                    console.info(f'Body: {body.decode("UTF-8")}')
                    body = f'{body.decode("UTF-8")}'

            pushAlert(message["date"], message["from"], message["subject"], body)

        imap_server.close()
        imap_server.logout()
    ```

8. Review the logic for the `def pushAlert()` function.

    ```python
    def pushAlert(date, who, sub, body):

        tenant = secrets.get('TENANT')
        url = "/api/v2/events/ingest"
        key = secrets.get('KEY')

        req_url = f"{tenant}{url}?Api-Token={key}"
        payload = {
            "eventType": "CUSTOM_ALERT",
            "title": sub,
            "properties": {"From": who, "Date": date, "Subject": sub, "Body": body},
        }

        console.success(f"DYNATRACE REQUEST URL: {req_url}")

        console.success(
            console.highlight(
                json.dumps(payload, indent=2),
                textColor=textColor.YELLOW,
                bgColor=bgColor.BLACK,
            ),
            showTime=False,
        )

        newHeaders = {"Content-type": "application/json", "charset": "utf-8"}
        response = requests.post(req_url, json.dumps(payload), headers=newHeaders)

        console.success("DYNATRACE API RESPONSE:")
        jresponse = response.json()

        console.success(
            console.highlight(
                json.dumps(jresponse, indent=2),
                textColor=textColor.YELLOW,
                bgColor=bgColor.BLACK,
            ),
            showTime=False,
        )
    ``` 

9. Run the python script!

    ```python
    python3 mail.py
    ```

10. Review the terminal output.

    ![output](https://github.com/geoteo/dt-push-email-alerts/blob/master/assets/output.png?raw=true)

11. Hop over to your Dynatrace tenant then go to the `Problems` page where you should see 2 custom problems containing the email details within.

    ![problemsOverview](https://github.com/geoteo/dt-push-email-alerts/blob/master/assets/problemsOverview.png?raw=true)

    ![specificProblem](https://github.com/geoteo/dt-push-email-alerts/blob/master/assets/specificProblem.png?raw=true)

12. Automate it by using a cronjob to run the script at a frequency of your choosing. (optional)

## FAQ

**Q: How do I install `pip` (package-management system) for Python?**

**A:** Python comes with an [`ensurepip`](https://docs.python.org/3/library/ensurepip.html#module-ensurepip "(in Python v3.10)") module[1](https://pip.pypa.io/en/stable/installation/#python), which can install pip in a Python environment.

```bash
python -m ensurepip --upgrade
```

**Q: How do I install a specific python package?**

**A:** Use pip to install python packages.
```bash
python -m pip install SomePackage
```
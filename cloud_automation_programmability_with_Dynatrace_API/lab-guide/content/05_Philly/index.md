## Automated configuration audit/backup
Automatic Backups to git when changes are detected from Dynatrace environment

### Pre-Requisites
Python 3.8 (Since 1.231)
Enabled Audit Log in Environment

### What are we Accomplishing?

We will developing a Dynatrace ActiveGate Extension using the Dynatrace audit logs to find when settings are changed. When the audit log sees settings were touched, we will use the Dynatrace settings.

### Download the Extension SDK
1. Navigate to your Dynatrace Environment.
2. Navigate to Settings > Monitored Technologies > Add new technology monitoring > Add ActiveGate extension > Download Extension SDK
3. Extract the zip that downloaded
4. Locate the ".whl" file inside the folder extracted

### Setting Up GitHub
1. Navigate to [GitHub Tokens Page](https://github.com/settings/tokens)
2. On the right side, click "Generate new token"
3. Give it permissions for all "repo" and "admin:repo_hook"
4. Copy the new token and keep it safe!
5. Navigate to [GitHub New Repo](https://github.com/new)
6. Create a new public repo and initialize with a README

### Setting up Python

1. SSH into the Bastion with credentials provided
2. Copy and Paste the code below to 'setup_configbackup.bash'
```
#!/bin/bash
pip3 install pipenv

if [[ ":$PATH:" == *":$HOME/.local/bin"* ]]; then
  echo "Your path is correctly set"
else
  export PATH=$HOME/.local/bin
fi

git clone <repository-no-longer-available>
cd dt-config-autobackup
pipenv install --python 3.8 requests

```
3. Run the script
```
bash setup_configbackup.bash
```
4. Copy the "\*.whl" file found in the SDK folder
5. Use  to install the sdk
```
pipenv install REPLACE_WITH_FILENAME.whl
```
6. Enter the project directory and enter virtual environment
```
cd dt-config-autobackup; pipenv shell
```
7. Create your "properties.json". Use nano/vim to paste this code block and edit accordingly
```
{
    "url":"https://tenant.live.dynatrace.com",
    "api_token": "PASTE-YOUR-TOKEN-HERE",
    "polling_interval": "1",
    "verify_ssl": false,
    "git_token": "GIT-PERSONAL-ACCESS-TOKEN",
    "git_user": "GIT-USER",
    "git_url": "GIT-REPO-URL",
    "timezone": "America/Detroit"
}
```

### Phase 0 - Set Up The Extension
1. Go to our first guided branch:
```
git checkout -t origin/Phase-0-Extension-Skeleton
```

### Phase 1 - Query the Audit Log
1. Checkout to our second guided branch:
```
git checkout -t origin/Phase-1-Query-Audit-Log
```
2. Open up Environment v2 Swagger and authenticate
3. Run a command for the past two hours
4. Look through the payload and then copy the URL to help build our function
5. Run plugin_sdk simulate_plugin

### Phase 2 - Getting the Config
1. Reset the git
```
git reset --hard HEAD
```
2. Checkout to the third guided branch
```
git checkout -t origin/Phase-2-Getting-the-Config
```
3. Add in the API endpoint and build the call to get configuration info. We need to parse the entityId into separate variables
4. Run plugin_sdk simulate_plugin


### Phase 3 - Posting to GitHub
1. Reset the git
```
git reset --hard HEAD
```
2. Checkout to the fourth guided branch
```
git checkout -t origin/Phase-3-Push-to-Git
```
3. Open environment v2 API and navigate to settings
4 Add in the code a call to post to GitHub with the user name and timestamp
5. plugin_sdk simulate_plugin

### Phase 4 - Building the Extension
1. Reset the git
```
git reset --hard HEAD
```
2. Checkout to the main branch
3. plugin_sdk build_plugin
4. Install the plugin via Dynatrace UI (Settings > Monitoring > Monitored Technologies > Add new technology monitoring > Add ActiveGate Extension > Upload Extension)
5. Copy the plugin to the Dynatrace ActiveGate plugin Directory

Reach out to Aaron at aaron.philipose@dynatrace.com if you have any questions!

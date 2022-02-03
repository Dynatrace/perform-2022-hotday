const inquirer = require('inquirer');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const fs = require('fs');
const os = require('os');
const {
  tagRuleQuestions,
  detectRuleQuestions,
  syntheticQuestions,
  synChoices
} = require('./questions');
dotenv.config();

//importing all JSON config files
//===============================

const autoTagRules = require('../jsonFiles/autoTagRules.json');
const appOverview = require('../jsonFiles/dashboards/appOverview.json');
const highLevelOverview = require('../jsonFiles/dashboards/highLevelOverview.json');
const licensingOverview = require('../jsonFiles/dashboards/licensingOverview.json')
const webAppConfig = require('../jsonFiles/webAppConfig.json');
const appDetectionRule = require('../jsonFiles/appDetectionRule.json');
const addToCart = require('../jsonFiles/synthetic/add-to-cart.json');
const homePage = require('../jsonFiles/synthetic/homepage.json');
const cartsAPI = require('../jsonFiles/synthetic/carts-api.json');
const pgNaming = require('../jsonFiles/conditionalNaming/processNaming.json');
const serviceNaming = require('../jsonFiles/conditionalNaming/serviceNaming.json');
const mgmtZone = require('../jsonFiles/managementZone/mgmtZone.json');

//===============================

const historyPath = './history.log';

/*  ---------------------------------------------------------------
 **                                                                  **
 ** Generates Web App based on jsonFiles/webAppConfig.json template  **
 **                                                                  **
 *  ---------------------------------------------------------------   */

const genWebApp = async (ans, headers, ask) => {
  //build web app based on answers
  let webAppJson = webAppConfig;
  webAppJson.name = ans.name;
  webAppJson.realUserMonitoringEnabled = ans.realUserMonitoringEnabled;
  webAppJson.costControlUserSessionPercentage = Number(
    ans.costControlUserSessionPercentage
  );
  webAppJson.sessionReplayConfig.enabled = ans.srEnabled;
  webAppJson.sessionReplayConfig.costControlPercentage =
    ans.costControlPercentage;

  const response = await fetch(
    `${process.env.TENANT}api/config/v1/applications/web`,
    {
      method: 'post',
      body: JSON.stringify(webAppJson),
      headers: headers
    }
  );

  const data = await response.json();
  if (response.ok) {
    fs.appendFile(
      historyPath,
      `${new Date().toISOString()} Application name: "${
        data.name
      }" Application ID: ${data.id}` + os.EOL,
      (err) => (err ? console.log(err) : '')
    );
    console.log(`Application "${data.name}" created!!!! Its ID: is ${data.id}`);
    console.log('\x1b[33m%s\x1b[0m', `Visit ${process.env.TENANT}#settings/deployment to view your tokens`)
  } else {
    console.log(`Something went wrong: code: ${data.error.code}, message: ${data.error.message}. Please check the information entered was correct`)
  }
  ask();
};

/*  -------------------------------------------------------------------------------
 **                                                                                 **
 ** Generates App Detection rule based on /jsonFiles/appDetectionRule.json template **
 **                                                                                 **
 *  -------------------------------------------------------------------------------  */

const generateAppDetectRule = async (headers, ask) => {
  const responseApps = await fetch(
    `${process.env.TENANT}api/config/v1/applications/web`,
    {
      headers: headers
    }
  );
  const dataApp = await responseApps.json();
  if (responseApps.ok) {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'application',
          message: 'Choose an application for the detection rule:',
          choices: dataApp.values.map((app) => app.name)
        }
      ])
      .then((answer) => {
        const index = dataApp.values.findIndex(
          (app) => app.name === answer.application
        );
        inquirer.prompt(detectRuleQuestions).then(async (ans) => {
          let appDetectRule = appDetectionRule;
          appDetectRule.applicationIdentifier = dataApp.values[index].id;
          appDetectRule.filterConfig.applicationMatchTarget = ans.choice1;
          appDetectRule.filterConfig.applicationMatchType = ans.choice2;
          appDetectRule.filterConfig.pattern = ans.choice3;

          const response = await fetch(
            `${process.env.TENANT}api/config/v1/applicationDetectionRules`,
            {
              method: 'post',
              body: JSON.stringify(appDetectRule),
              headers: headers
            }
          );
          const data = await response.json();
          if (response.ok) {
            fs.appendFile(
              historyPath,
              `${new Date().toISOString()} Detection rule ID: ${
                data.id
              } created for Application "${data.name}" ` + os.EOL,
              (err) => (err ? console.log(err) : '')
            );
            console.log(
              `Rule ID: "${data.id}" created for Application "${data.name}"`
            );
            console.log('\x1b[33m%s\x1b[0m', `Visit ${process.env.TENANT}#settings/rum/webappmonitoring to see your new app detection rule`)
          } else {
            console.log(
              `Something went wrong: Status - ${response.status}, ${response.statusText}`
            );
          }
          ask();
        });
      });
  } else {
    console.log(
      `Something went wrong: Status - ${responseApps.status}, ${responseApps.statusText}`
    );
  }
};

/*  ---------------------------------------------------------------------
 **                                                                       **
 ** Generates AutoTag rule based on /jsonFiles/autoTagRules.json template **
 **                                                                       **
 *  ---------------------------------------------------------------------  */

const generateTagRule = (headers, ask) => {
  inquirer.prompt(tagRuleQuestions).then(async (ans) => {
    let taggingRule = autoTagRules;
    taggingRule.name = ans.tagRuleName;
    taggingRule.rules[0].type = ans.type;
    taggingRule.rules[0].conditions[0].comparisonInfo.operator = ans.operator;
    taggingRule.rules[0].conditions[0].comparisonInfo.value = ans.tagRuleValue;
    const response = await fetch(
      `${process.env.TENANT}api/config/v1/autoTags`,
      {
        method: 'post',
        body: JSON.stringify(taggingRule),
        headers: headers
      }
    );
    const data = await response.json();
    if (response.ok) {
      fs.appendFile(
        historyPath,
        `${new Date().toISOString()} Tag rule ID: "${data.id}". Rule name: "${
          data.name
        }" ` + os.EOL,
        (err) => (err ? console.log(err) : '')
      );
      console.log(`Rule "${data.id}" created for "${data.name}"`);
      console.log('\x1b[33m%s\x1b[0m', `Visit ${process.env.TENANT}#settings/taggingoverview/autotags to see your new tag rule`)
    }  else {
      console.log(
        `Something went wrong: Status - ${response.status}, ${response.statusText}`
      );
    }
    ask();
  });
};

/*  ---------------------------------------------------------
 **                                                           **
 ** Deploys a dashboard based on jsonFiles/synthetic/xxx.json **
 **                                                           **
 *  ---------------------------------------------------------  */
const syntheticHelper = async (synthetic, headers, ask) => {
  inquirer.prompt(syntheticQuestions).then(async (ans) => {
    synthetic.name = ans.name;
    !synthetic.script.events
      ? (synthetic.script.requests[0].url = ans.URL)
      : (synthetic.script.events[0].url = ans.URL);
    synthetic.tags[0].key = ans.tagEnv;

    const response = await fetch(
      `${process.env.TENANT}api/v1/synthetic/monitors`,
      {
        method: 'post',
        body: JSON.stringify(synthetic),
        headers: headers
      }
    );

    const data = await response.json();
    if (response.ok) {
      fs.appendFile(
        historyPath,
        `${new Date().toISOString()} Synthetic monitor: "${
          ans.name
        }" created. Synthetic ID: ${data.entityId}` + os.EOL,
        (err) => (err ? console.log(err) : '')
      );
      console.log(
        `Synthetic monitor: "${ans.name}" created!!!! Its ID: is ${data.entityId}`
      );
      console.log('\x1b[33m%s\x1b[0m', `Visit ${process.env.TENANT}#monitors to see your monitors`)
    } else {
      console.log(
        `Something went wrong: Status - ${response.status}, ${response.statusText}`
      );
    }
    ask();
  });
};

const deploySynthetics = async (headers, ask) => {
  inquirer.prompt(synChoices).then((ans) => {
    switch (ans.monitor) {
      case 'Homepage (browser)':
        syntheticHelper(homePage, headers, ask);
        break;
      case 'Add to cart (browser clickpath)':
        syntheticHelper(addToCart, headers, ask);
        break;
      case 'Cart API (http)':
        syntheticHelper(cartsAPI, headers, ask);
        break;
    }
  });
};

/*  --------------------------------------------------------------------------------------
 **                                                                                        **
 ** Generates Conditional naming rule based on /jsonFiles/conditionalNaming json templates **
 **                                                                                        **
 *  --------------------------------------------------------------------------------------  */

const generateManagementZone = async (mzrule, environment, headers) => {
  if (environment === 'Production') {
    mzrule.name = 'Production';
    mzrule.rules[0].conditions[0].comparisonInfo.value.value = 'prod';
    mzrule.rules[1].conditions[0].comparisonInfo.value = 'Production';
    mzrule.rules[2].conditions[0].comparisonInfo.value.key = 'Production';
    mzrule.rules[3].conditions[0].comparisonInfo.value.key = 'Production';
  } else {
    mzrule.name = 'Dev';
    mzrule.rules[0].conditions[0].comparisonInfo.value.value = 'dev';
    mzrule.rules[1].conditions[0].comparisonInfo.value = 'Dev';
    mzrule.rules[2].conditions[0].comparisonInfo.value.key = 'Dev';
    mzrule.rules[3].conditions[0].comparisonInfo.value.key = 'Dev';
  }
  const response = await fetch(
    `${process.env.TENANT}api/config/v1/managementZones`,
    {
      method: 'post',
      body: JSON.stringify(mzrule),
      headers: headers
    }
  );
  const data = await response.json();
  if (response.ok) {
    fs.appendFile(
      historyPath,
      `${new Date().toISOString()} MZ: "${data.name}" created. Rule ID: ${
        data.id
      }` + os.EOL,
      (err) => (err ? console.log(err) : '')
    );
    console.log(`MZ: "${data.name}" created. Rule ID: ${data.id}`);
    console.log('\x1b[33m%s\x1b[0m', `Visit ${process.env.TENANT}#settings/#settings/preferences/mzoverview to see your new Management Zones`)
  } else {
    console.log(
      `Something went wrong: Status - ${response.status}, ${response.statusText}`
    );
  }
};

const mzRuleHelper = async (headers, ask) => {
  await generateManagementZone(mgmtZone, 'Production', headers);

  await generateManagementZone(mgmtZone, 'Dev', headers);

  await ask();
};

/*  ------------------------------------------------
 **                                                  **
 ** Deploys a dashboard based on dashboards/xxx.json **
 **                                                  **
 *  ------------------------------------------------  */
const dashHelper = async (dash, headers) => {
  let dashboard = dash;
  const response = await fetch(
    `${process.env.TENANT}api/config/v1/dashboards`,
    {
      method: 'post',
      body: JSON.stringify(dashboard),
      headers: headers
    }
  );
  const data = await response.json();
  if (response.statusText === 'Created') {
    fs.appendFile(
      historyPath,
      `${new Date().toISOString()} Dashboard: "${data.name}" - Dashboard ID: ${
        data.id
      }` + os.EOL,
      (err) => (err ? console.log(err) : '')
    );
    console.log('Dashboard created');
  } else {
    console.log(response)
    console.log(
      `Something went wrong: Status - ${response.status}, ${response.statusText}`
    );
  }
};

const deployDashboard = async (headers, ask) => {
  
  //first dashboard
  await dashHelper(appOverview, headers);
  
  //second dashboard
  await dashHelper(highLevelOverview, headers);
  
  //third dashboard
  await dashHelper(licensingOverview, headers);
  //insert any dashboard you want to upload
  console.log('\x1b[33m%s\x1b[0m', `Visit ${process.env.TENANT}ui/dashboards?filters=preset%3Dtrue&filters=owner%3DHOT%20session to see your new dashboards`)
  await ask();
};

/* ----------------------------------------------------------------------------------------
 **                                                                                        **
 ** Generates Conditional naming rule based on /jsonFiles/conditionalNaming json templates **
 **                                                                                        **
 *  --------------------------------------------------------------------------------------  */

const generateConditionalNamingRule = async (headers, ask) => {
  const responsePG = await fetch(
    `${process.env.TENANT}api/config/v1/conditionalNaming/processGroup`,
    {
      method: 'post',
      body: JSON.stringify(pgNaming),
      headers: headers
    }
  );
  const dataPG = await responsePG.json();
  if (responsePG.ok) {
    fs.appendFile(
      historyPath,
      `${new Date().toISOString()} PG naming rule: "${
        dataPG.name
      }" created. Rule ID: ${dataPG.id}` + os.EOL,
      (err) => (err ? console.log(err) : '')
    );
    console.log(
      `PG naming rule: "${dataPG.name}" created. Rule ID: ${dataPG.id}`
    );
    console.log('\x1b[33m%s\x1b[0m', `Visit ${process.env.TENANT}#settings/pgnamingsettings to see your new PG naming rule`)
  } else {
    console.log(
      `Something went wrong: Status - ${responsePG.status}, ${responsePG.statusText}`
    );
  }

  const responseService = await fetch(
    `${process.env.TENANT}api/config/v1/conditionalNaming/service`,
    {
      method: 'post',
      body: JSON.stringify(serviceNaming),
      headers: headers
    }
  );
  const dataService = await responseService.json();
  if (responseService.ok) {
    fs.appendFile(
      historyPath,
      `${new Date().toISOString()} Service naming rule: "${
        dataService.name
      }" created. Rule ID: ${dataService.id}` + os.EOL,
      (err) => (err ? console.log(err) : '')
    );
    console.log(
      `Service naming rule: "${dataService.name}" created. Rule ID: ${dataService.id}`
    );
    console.log('\x1b[33m%s\x1b[0m', `Visit ${process.env.TENANT}#settings/servicenamingsettings to see your new Service naming rule`)
  } else {
    console.log(
      `Something went wrong: Status - ${responseService.status}, ${responseService.statusText}`
    );
  }
  ask();
};







//=============================================================================

/*  --------------------------------------------------------------------
 **                                                                     **
 ** Generates TEMPLATE rule based on /jsonFiles/TEMPLATE.json template  **
 **                                                                     **
 *  ------------------------------------------------------------------- */
const generateTemplate = (headers, ask) => {
  inquirer
    .prompt('INSERT YOUR CREATED QUESTIONS HERE FROM QUESTIONS.JS')
    .then(async (ans) => {
      //read TEMPLATE.json template
      let newRule = 'ADD YOUR FILE'; // <---- replace your JSON FILE NAME HERE
      newRule.name = ans.name; //<---- replace yourQuestionName for the name of the answer, try to maintain consistency in the naming
      //add as many replacements as questions you have created

      const response = await fetch(
        `${process.env.TENANT}api/YOUR_API_ENDPOINT`, // <--replace with the api endpoint you want to trigger
        {
          method: 'post',
          body: JSON.stringify(newRule),
          headers: headers
        }
      );
      const data = await response.json();
      if (response.ok) {
        fs.appendFile(
          historyPath,
          `${new Date().toISOString()} - ${data.id}"` + os.EOL, // <-- add or modify anything you would like to get on the history log
          (err) => (err ? console.log(err) : '')
        );
        console.log(`${data} returned`);
      } else {
        console.log(
          `Something went wrong: Status - ${responseApps.status}, ${responseApps.statusText}`
        );
      }
      ask();
    });
};

module.exports = {
  generateTagRule,
  generateAppDetectRule,
  genWebApp,
  deployDashboard,
  deploySynthetics,
  mzRuleHelper,
  generateManagementZone,
  generateConditionalNamingRule
}; // <--- add your function created above (i.e. generateTemplate)

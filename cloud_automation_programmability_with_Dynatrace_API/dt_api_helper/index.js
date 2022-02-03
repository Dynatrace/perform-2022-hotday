const inquirer = require('inquirer');
const dotenv = require('dotenv');
const {
  generateTagRule,
  genWebApp,
  deployDashboard,
  generateAppDetectRule,
  deploySynthetics,
  generateConditionalNamingRule,
  mzRuleHelper
} = require('./utils/actions');
const { webAppQs, options } = require('./utils/questions');

dotenv.config();

const headers = {
  Authorization: `Api-Token ${process.env.API_KEY}`,
  'Content-Type': 'application/json'
};

console.log('\r\n================================');
console.log('Welcome to Dynatrace API kit');
console.log('================================ \r\n');

const start = () => {
  inquirer.prompt(options).then((userChoice) => {
    switch (userChoice.options) {
      case 'Create new Web app':
        generateWebApp(ask);
        break;
      case 'Create a app detection rule':
        generateAppDetectRule(headers, start);
        break;
      case 'Create auto-tags':
        generateTagRule(headers, start);
        break;
      case 'Deploy Dashboard':
        deployDashboard(headers, start);
        break;
      case 'Deploy Synthetic Monitors':
        deploySynthetics(headers, start);
        break;
      case 'Create conditional naming rules':
        generateConditionalNamingRule(headers, start);
        break;
      case 'Create Management Zones':
        mzRuleHelper(headers, start)
        break;
      case "I'm done":
        console.log('Good bye!! Check "history.log" for some activity history');
        break;
    }
  });
};

const ask = () => {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'continue',
        message: 'Would you like to do anything else?'
      }
    ])
    .then((answer) => {
      if (answer.continue) {
        start();
      } else {
        console.log('Good bye!! Check "history.log" for some activity history');
      }
    });
};

const generateWebApp = (ask) => {
  inquirer
    .prompt(webAppQs)
    .then((ans) => {
      inquirer.prompt([
        {
        type: 'confirm',
        message: `Please verify that the information below is correct:\n
name: ${ans.name}\r
RUM enabled: ${ans.realUserMonitoringEnabled}\n
RUM %: ${ans.costControlUserSessionPercentage}\n
SR enabled: ${ans.srEnabled}\n
SR %: ${ans.costControlPercentage}\n`,
        name: 'confirmApp',
        default: true,
        }
      ]).then(a => {
        if (a.confirmApp === true) {
          genWebApp(ans, headers, start)
        } else {
          generateWebApp(start);
        }
      })

    });
};

start();

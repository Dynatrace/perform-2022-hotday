const inquirer = require('inquirer');
const fetch = require('node-fetch');
const fs = require('fs');
const os = require('os');
const { tokenQuestions } = require('./utils/questions');

const path = './.env';

/* -----------------------------------------------------------------
 **                                                                   **
 ** Generates Token based on /jsonFiles/tokenGeneration.json template **
 **                                                                   **
 *  -----------------------------------------------------------------  */
const generateToken = () => {
  if (fs.existsSync(path)) {
    console.log(
      '.env file already exists, please delete the file before you run this again.'
    );
  } else {
    inquirer.prompt(tokenQuestions).then(async (ans) => {
      try {
        let newRule = JSON.parse(
          fs.readFileSync('./jsonFiles/tokenGeneration.json', 'utf8')
        );
        newRule.name = ans.tokenName;
        newRule.expiresIn.value = Number(ans.days);
        if (ans.tenant.slice(-1) !== '/') {
          ans.tenant = ans.tenant.concat('/')
        }
        const response = await fetch(`${ans.tenant}api/v2/apiTokens`, {
          method: 'post',
          body: JSON.stringify(newRule),
          headers: {
            Authorization: `Api-Token ${ans.masterToken}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (response.ok) {
          fs.appendFile(
            '../TOKEN.log',
            `${new Date().toISOString()} - Token generated via API. The token id is: ${
              data.token
            }` + os.EOL, 
            (err) => (err ? console.log(err) : '')
          );
          fs.appendFile(
            './.env',
            `API_KEY=${data.token}` + os.EOL, 
            (err) => (err ? console.log(err) : '')
          );
          console.log(`TOKEN: ${data.token} has been generated`);
          console.log('\x1b[33m%s\x1b[0m', `Visit ${ans.tenant}ui/access-tokens to view your tokens`)
          console.log('.env file has been generated.')
          console.log('Token has been logged in TOKEN.log.')
          fs.appendFile(
            './.env',
            `TENANT=${ans.tenant}` + os.EOL, 
            (err) => (err ? console.log(err) : '')
          );
        } else {
          console.log(`Something went wrong: code: ${data.error.code}, message: ${data.error.message}. Please check the information entered was correct`)
        }
      } catch (err) {
        console.error(err);
      }
    });
  }
};

generateToken();

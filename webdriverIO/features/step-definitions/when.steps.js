const { When } = require("@wdio/cucumber-framework");
const LoginPage = require("../pageobjects/login.page");

When(/^User enters (.*) and (.*)$/, async (email, password) => {
  await LoginPage.verifyLoginPage()
  await LoginPage.login(email, password)
});

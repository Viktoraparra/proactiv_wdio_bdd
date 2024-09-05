const { Given } = require("@wdio/cucumber-framework");
const HomePage = require("../pageobjects/home.page");
const LoginPage = require("../pageobjects/login.page");
const expectchai = require("chai").expect;

Given(/^User is on main page and navigates to login page$/, async () => {
  try {
    await HomePage.open();
    await HomePage.closeForm();
    await HomePage.clickLogin();
  } catch (error) {
    error.message = `${error.message}`;
    throw error;
  }
});

Given(
  /^User logs in with email (.*) and password (.*)$/,
  async (email, password) => {
    try {
      await HomePage.open();
      await HomePage.closeForm();
      await HomePage.clickLogin();
      await LoginPage.verifyLoginPage();
      await LoginPage.login(email, password);
    } catch (error) {
      error.message = `${error.message}`;
      throw error;
    }
  }
);

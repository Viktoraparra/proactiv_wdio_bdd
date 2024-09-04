const { Given } = require("@wdio/cucumber-framework");
const HomePage = require("../pageobjects/home.page");
const expectchai = require('chai').expect

Given(/^User is on main page and navigates to login page$/, async () => {
  // Opens the page using the page objects pattern
  await HomePage.open()
  await HomePage.closeForm();
  await HomePage.clickLogin();
});

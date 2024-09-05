const loginPage = require("../pageobjects/login.page");
const FeaturePage = require("../pageobjects/feature.page");
const consFeature = require("../../data/constFeature.json");
const { Then } = require("@wdio/cucumber-framework");
const { default: reporter } = require("../../helpers/reporter");
const ProductPage = require("../pageobjects/product.page");

Then(/^User should see (.*)$/, async (outcome) => {
  await loginPage.loginAndErrorMsg(outcome);
});

Then(
  /^User should validates the title and description of each product$/,
  async () => {
    try {
      await FeaturePage.validateCards(
        consFeature.products.titles,
        consFeature.products.descriptions
      );
    } catch (error) {
      error.message = `${error.message}`;
      throw error;
    }
  }
);

Then(/^User validates (.*) page and validate (.*)$/, async (product, price) => {
  try {
    await ProductPage.verifyProductTitle(product);
    await ProductPage.verifyProductPrice(price);
  } catch (error) {
    error.message = `${error.message}`;
    throw error;
  }

});

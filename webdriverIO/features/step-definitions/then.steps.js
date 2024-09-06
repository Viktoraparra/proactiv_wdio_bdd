const loginPage = require("../pageobjects/login.page");
const FeaturePage = require("../pageobjects/feature.page");
const consFeature = require("../../data/constFeature.json");
const { Then } = require("@wdio/cucumber-framework");
const { default: reporter } = require("../../helpers/reporter");
const ProductPage = require("../pageobjects/product.page");
const ShopPage = require("../pageobjects/shop.page");

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

Then(/^User should navigates to (.*)$/, async (productType) => {
  try {
    await ShopPage.SelectProductOptionFromLeftNavBar(productType);
  } catch (error) {
    error.message = `${error.message}`;
    throw error;
  }

});

  // try {
  //   const productlist = await $$('//body/div[@id="page-content"]/div[1]/div[1]/div[6]/div[1]/div[1]/ul[1]/li/a');
  //   for (let i = 0; i < productlist.length; i++) {
  //     const text =  await productlist[i].getText();
  //     if (text.toLowerCase().includes(productType.toLowerCase())) {
  //       await productlist[i].click();
  //       reporter.addStep(
  //         "selectProductOptionFromLeftNavBar",
  //         "info",
  //         `Clicked on product option: "${productType}"`
  //       );
  //       return;
  //     }
  //   }
  // } catch (error) {
  //   reporter.addStep(
  //     "selectProductOptionFromLeftNavBar",
  //     "error",
  //     `Error while selecting product option: ${error.message}`
  //   );
  //   error.message = `${error.message}`;
  //   throw error;
  // }
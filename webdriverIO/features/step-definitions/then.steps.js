const loginPage = require("../pageobjects/login.page");
const FeaturePage = require("../pageobjects/feature.page");
const consFeature = require("../../data/constFeature.json");
const { Then } = require("@wdio/cucumber-framework");
const { default: reporter } = require("../../helpers/reporter");
const ProductPage = require("../pageobjects/product.page");
const ShopPage = require("../pageobjects/shop.page");
const SubCartPage = require("../pageobjects/subCart.page");
const CartPage = require("../pageobjects/cart.page");


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
    await ShopPage.selectProductOptionFromLeftNavBar(productType);
  } catch (error) {
    error.message = `${error.message}`;
    throw error;
  }

});

/**
 * This function is failling due existing duplicates elements int the domain
 */
Then(/^User validates the (.*) the (.*) and the (.*) subcart$/, async (productTitle, productQty, productPrice) => {
  try {
    await SubCartPage.validateProductInCart(productTitle, productQty, productPrice)
  } catch (error) {
    error.message = `${error.message}`;
    throw error;
  }

});

Then(/^User clicks view cart$/, async () => {
  try {
    await SubCartPage.subCartViewCartBtn.click()
    await CartPage.validateCartPageHeader()
  } catch (error) {
    error.message = `${error.message}`;
    throw error;
  }

});


Then(/^validates the (.*) the (.*) and the (.*)$/, async (productTitle, productQty, productPrice) => {
  try {
    await CartPage.validateProductInCart(productTitle, productQty, productPrice)
  } catch (error) {
    error.message = `${error.message}`;
    throw error;
  }

});
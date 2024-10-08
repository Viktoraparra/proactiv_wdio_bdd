const { When } = require("@wdio/cucumber-framework");
const LoginPage = require("../pageobjects/login.page");
const HomePage = require("../pageobjects/home.page");
const FeaturePage = require("../pageobjects/feature.page");
const consFeature = require("../../data/constFeature.json");
const consMask = require("../../data/consMask.json");
const ProductsPage = require("../pageobjects/products.page");

When(/^User enters (.*) and (.*)$/, async (email, password) => {
  await LoginPage.verifyLoginPage();
  await LoginPage.login(email, password);
});

When(/^User navigates to the Feature page$/, async () => {
  try {
    await HomePage.navigateToFeatured();
    await FeaturePage.validatesFeaturePage(
      consFeature.pageTitle,
      consFeature.headerTitle
    );
  } catch (error) {
    error.message = `${error.message}`;
    throw error;
  }
});

When(/^User navigates to the shop page$/, async () => {
  try {
    await HomePage.navigateToShop();
  } catch (error) {
    error.message = `${error.message}`;
    throw error;
  }
});

When(/^User clicks on (.*) and navigates to product page$/, async (product) => {
  try {
    await FeaturePage.searchProductForPurchase(product);
  } catch (error) {
    error.message = `${error.message}`;
    throw error;
  }
});


When(/^User is on (.*) validates available products$/, async (productType) => {
  try {
    await ProductsPage.validatesProductsTitleAndDescription(productType, consMask.Description)
    await ProductsPage.validateProductTitleRetailMembersPrice(consMask.products.titles,consMask.products.ProductEffects,consMask.products.membersPrice)
  } catch (error) {
    error.message = `${error.message}`;
    throw error;
  }
});

When(/^User add (.*) to cart$/, async (productType) => {
  try {
    await ProductsPage.searchProductAndAddToCart(productType)
  } catch (error) {
    error.message = `${error.message}`;
    throw error;
  }
});
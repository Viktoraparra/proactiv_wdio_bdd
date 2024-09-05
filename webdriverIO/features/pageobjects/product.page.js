const { default: reporter } = require("../../helpers/reporter");
const Page = require("./page");

class ProductPage extends Page {
  get productTitle() {
    return $('/html[1]/body[1]/div[2]/div[2]/div[1]/div[2]/div[1]/div[3]/div[2]/h1[1]');
  }

  get productPrice() {
    return $('/html[1]/body[1]/div[2]/div[2]/div[1]/div[2]/div[1]/div[3]/div[2]/div[3]/div[1]/div[2]/div[1]/div[1]/div[1]/span[1]/span[1]/strong[1]');
  }
  async verifyProductTitle(product) {
    try {
      await this.productTitle.waitForExist()
      const prodTitle = await this.productTitle.getText();
      await expect(await prodTitle).toContain(product);
      reporter.addStep(
        "verifyProductTitle",
        "info",
        `Verified product title successfully. Expected: "${product}", Actual: "${prodTitle}".`
      );
    } catch (error) {
      reporter.addStep(
        "verifyProductTitle",
        "error",
        `Error verifying product title. Expected: "${product}" Error: ${error.message}`
      );
      error.message = `${error.message}`;
      throw error;
    }
  }

  async verifyProductPrice(price) {
    try {
      const actualPrice = await this.productPrice.getText();
      const totalIntValue = parseFloat(actualPrice.split("$")[1].trim());
      await expect(totalIntValue).toEqual(parseFloat(price));
      reporter.addStep(
        "verifyProductPrice",
        "info",
        `Verified product price successfully. Expected: "${price}", Actual: "${totalIntValue}".`
      );
    } catch (error) {
      reporter.addStep(
        "verifyProductPrice",
        "error",
        `Error verifying product price. Expected: "${price}". Error: ${error.message}`
      );
      error.message = `${error.message}`;
      throw error;
    }
  }
}

module.exports = new ProductPage();


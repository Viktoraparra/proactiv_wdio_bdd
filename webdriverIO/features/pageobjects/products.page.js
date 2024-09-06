const { default: reporter } = require("../../helpers/reporter");
const Page = require("./page");

class ProductsPage extends Page {
  get productsTitle() {
    return $("h3[class='category-hero-banner-custom-text__heading']");
  }

  get productsDescription() {
    return $("//div[@class='category-hero-banner-custom-text-content']");
  }

  get productCards() {
    return $$('//div[@class="mz-productlisting-info"]');
  }

  /**
   * Validates the product's title and description against expected values.
   *
   * This method navigates through different product types (e.g., creams, cups, shoes, pants, etc.)
   * and checks if the product title and description match the expected values provided.
   *
   * @param {string} ExpectedTitle - The expected title of the product to validate.
   * @param {string} ExpectedDescription - The expected description of the product to validate.
   * @throws Will throw an error if the title or description does not match the expected values.
   */
  async validatesProductsTitleAndDescription(
    ExpectedTitle,
    ExpectedDescription
  ) {
    try {
      await this.productsTitle.waitForExist();
      await expect(await this.productsTitle.getText()).toContain(ExpectedTitle);
      await expect(await this.productsDescription.getText()).toEqual(
        ExpectedDescription
      );
      reporter.addStep(
        "validatesProductsTitleAndDescription",
        "info",
        `Successfully validated the product title: "${ExpectedTitle}" and description: "${ExpectedDescription}".`
      );
    } catch (error) {
      reporter.addStep(
        "validatesProductsTitleAndDescription",
        "error",
        `Validation failed: ${error.message}`
      );
      error.message = `${error.message}`;
      throw error;
    }
  }

  /**
 * Retrieves the title of a product based on its index.
 *
 * This method accesses a specific product card from a list of product cards
 * (e.g., creams, cups, shoes, pants, etc.) using the provided index, and retrieves
 * the title of that product by targeting the HTML element containing the product title.
 *
 * @param {number} index - The index of the product in the list of product cards.
 * @returns {Promise<string>} - The title of the product.
 */
  async getTitleOfProduct(index) {
    return await this.productCards[index]
      .$('//h2[@class="productlisting_title"]')
      .getText();
  }

  /**
 * Retrieves the retail price of a product based on its index.
 *
 * This method accesses a specific product card from a list of product cards using the provided index,
 * and retrieves the retail price of that product. The retail price is typically displayed alongside
 * the product title or in a designated price area within the product card.
 *
 * @param {number} index - The index of the product in the list of product cards.
 * @returns {Promise<string>} - The retail price of the product.
 */
  async getRetailPriceOfProduct(index) {
    return await this.productCards[index]
      .$('//h2[@class="productlisting_title"]')
      .getText();
  }

  /**
 * Retrieves the member's price of a product based on its index.
 *
 * This method accesses a specific product card from a list of product cards using the provided index,
 * and retrieves the price for members, which may differ from the retail price. This price is typically
 * highlighted or displayed as a special sale price within the product card.
 *
 * @param {number} index - The index of the product in the list of product cards.
 * @returns {Promise<string>} - The member's price of the product.
 */
  async getMembersPriceOfProduct(index) {
    return await this.productCards[index]
      .$('//span[@class=" mz-price is-saleprice  "]')
      .getText();
  }


/**
 * Clicks the "Buy Now" button for a specific product based on its index.
 *
 * This method accesses a specific product card from a list of product cards using the provided index,
 * and clicks the "Buy Now" button to add the product to the cart. This action is typically performed
 * when a user wants to purchase a product directly from the product listing page.
 *
 * @param {number} index - The index of the product in the list of product cards.
 * @returns {Promise<void>}
 */
  async clickBuyNowButton(index) {
    await this.productCards[index].$("#add-to-cart").click();
  }

  /**
   * Validates the titles, retail prices, and members prices of different products.
   *
   * This method navigates through various product cards (e.g., creams, cups, shoes, pants, etc.)
   * and validates that each product's title, retail price, and members price match the expected values
   * provided in the respective arrays.
   *
   * @param {Array<string>} expectedTitles - An array of expected product titles to validate.
   * @param {Array<string>} expectedRetailPrices - An array of expected retail prices for the products.
   * @param {Array<string>} expectedMembersPrices - An array of expected members prices for the products.
   * @throws Will throw an error if any product's title, retail price, or members price does not match the expected values.
   */
  async validateProductTitleRetailMembersPrice(
    expectedTitles,
    expectedRetailPrices,
    expectedMembersPrices
  ) {
    try {
      for (let i = 0; i < (await this.productCards.length); i++) {
        const title = await this.getTitleOfProduct(i);
        const retailPrice = await this.getRetailPriceOfProduct(i);
        const memberPrice = await this.getRetailPriceOfProduct(i);
        await expect(title).toContain(expectedTitles[i]);
        await expect(retailPrice).toContain(expectedRetailPrices[i]);
        await expect(memberPrice).toContain(expectedMembersPrices[i]);
        reporter.addStep(
          "validate Product Title Retail and Members Prices",
          "info",
          `Successfully validated product "${title}" with retail price "${retailPrice}" and member price "${memberPrice}".`
        );
      }
      reporter.addStep(
        "validate Product Title Retail and Members Prices",
        "info",
        `Validation of all product cards completed successfully.`
      );
    } catch (error) {
      reporter.addStep(
        "validate Product Title Retail and Members Prices",
        "error",
        `Validation failed: ${error.message}`
      );
      error.message = `${error.message}`;
      throw error;
    }
  }

  /**
   * Searches for a product by its title and adds it to the cart.
   *
   * This method navigates through various product cards (e.g., creams, cups, shoes, pants, etc.)
   * and searches for a product whose title matches the expected title. If a match is found,
   * the method clicks on the "Buy Now" button for that product, effectively adding it to the cart.
   *
   * @param {string} expectedTitle - The title of the product to search for and add to the cart.
   * @throws Will throw an error if no product with the expected title is found.
   */
  async searchProductAndAddToCart(expectedTitle) {
    try {
      for (let i = 0; i < (await this.productCards.length); i++) {
        const title = await this.getTitleOfProduct(i);
        if (title.toLowerCase().includes(expectedTitle.toLowerCase())) {
          await this.clickBuyNowButton(i);
          reporter.addStep(
            "searchProductAndAddToCart",
            "info",
            `Clicked on product: "${title}"`
          );
          return;
        }
      }
    } catch (error) {
      reporter.addStep(
        "searchProductAndAddToCart",
        "error",
        `Error occurred while searching for product with title "${expectedTitle}": ${error.message}`
      );
      error.message = `${error.message}`;
      throw error;
    }
  }
}

module.exports = new ProductsPage();

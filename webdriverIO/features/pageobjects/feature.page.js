const { default: reporter } = require("../../helpers/reporter");
const Page = require("./page");

class FeaturePage extends Page {
  get featuredHeaderTitle() {
    return $('//h1[@class="yourskinHeading"]');
  }
  get featureCard() {
    return $$("#blogcard");
  }

  /**
   * Validates the Feature Page by checking the title and header text.
   * @param {string} ExpectedPageTitle - The expected title of the feature page.
   * @param {string} ExpectedHeader - The expected header text on the feature page.
   * @throws Will throw an error if the page title or header text do not match the expected values.
   */
  async validatesFeaturePage(ExpectedPageTitle, ExpectedHeader) {
    try {
      reporter.addStep(
        "validateFeaturePage",
        "info",
        `Successfully validated the page title: "${ExpectedPageTitle}"`
      );
      await expect(browser).toHaveTitle(ExpectedPageTitle);
      await expect(await this.featuredHeaderTitle.getText()).toEqual(
        ExpectedHeader
      );
      reporter.addStep(
        "validateFeaturePage",
        "info",
        `Successfully validated the header text: "${ExpectedHeader}"`
      );
    } catch (error) {
      reporter.addStep(
        "validateFeaturePage",
        "error",
        `Validation failed: ${error.message}`
      );
      error.message = `${error.message}`;
      throw error;
    }
  }

  /**
   * Opens the feature page by navigating to the base URL + path.
   * Verifies that the page title is correct after opening.
   */
  async openFeaturePage() {
    try {
      reporter.addStep(
        "open",
        "info",
        "Opening the base URL: " + process.env.BASE_URL
      );
      await super.open(`${process.env.BASE_URL}/featured-page`);
      await expect(browser).toHaveTitle("Featured-page");
      reporter.addStep(
        "open",
        "info",
        "Successfully navigated directly to base feature-page."
      );
    } catch (error) {
      reporter.addStep(
        "open",
        "error",
        `Failed to open the base URL: ${error.message}`
      );
      error.message = `${error.message}`;
      throw error;
    }
  }

  async getTitleOfCard(index) {
    return await this.featureCard[index].$("h5.title").getText();
  }

  /**
   * Method to get the description of a specific blog card by index
   * @param {number} index - The index of the blog card in the array whose description
   *                         you want to retrieve. Indexing is zero-based.
   */
  async getDescriptionOfCard(index) {
    return await this.featureCard[index].$("p.desc").getText();
  }

  /**
   *  Method to click the "shop now" button of a specific blog card by index
   * @param {number} index - The index of the blog card in the array whose description
   *                         you want to retrieve. Indexing is zero-based.
   */
  async clickShopNowButton(index) {
    await this.featureCard[index].$("a.blogcard_link").click();
  }

  /**
   *  Method to validate the title and description of all cards
   * @param {number} index - The index of the blog card in the array whose description
   *                         you want to retrieve. Indexing is zero-based.
   */

  /**
   * Validates the titles and descriptions of all blog cards on the page.
   * @param {string[]} expectedTitles - An array of expected titles for the blog cards,
   *                                    in the order they appear on the page.
   * @param {string[]} expectedDescriptions - An array of expected descriptions for the
   *                                          blog cards, matching the order of titles.
   * @throws Will throw an error if any title or description does not match the expected value.
   */
  async validateCards(expectedTitles, expectedDescriptions) {
    try {
      for (let i = 0; i < (await this.featureCard.length); i++) {
        const title = await this.getTitleOfCard(i);
        const description = await this.getDescriptionOfCard(i);
        await expect(title).toContain(expectedTitles[i]);
        await expect(description).toContain(expectedDescriptions[i]);
        reporter.addStep(
          "validateProductCards",
          "info",
          `Validation of product ${title}`
        );
      }
      reporter.addStep(
        "validateProductCards",
        "info",
        `Validation of product cards completed successfully`
      );
    } catch (error) {
      reporter.addStep(
        "validateProductCards",
        "error",
        `Validation failed: ${error.message}`
      );
      error.message = `${error.message}`;
      throw error;
    }
  }

  /**
   * Searches for a product by its title and clicks the "Shop Now" button if found.
   * @param {string} expectedTitle - The title of the product to search for.
   * @throws Will throw an error if the product with the specified title is not found.
   */
  async searchProductForPurchase(expectedTitle) {
    try {
      for (let i = 0; i < (await this.featureCard.length); i++) {
        const title = await this.getTitleOfCard(i);
        console.log(expectedTitle.toLowerCase());
        if (title.toLowerCase().includes(expectedTitle.toLowerCase())) {
          await this.clickShopNowButton(i);
          reporter.addStep(
            "searchProductForPurchase",
            "info",
            `Clicked on product: "${title}"`
          );
          return;
        }
      }
    } catch (error) {
      reporter.addStep(
        "searchProductForPurchase",
        "error",
        `Product with title "${expectedTitle}" not found`
      );
      error.message = `${error.message}`;
      throw error;
    }
  }
}

module.exports = new FeaturePage();

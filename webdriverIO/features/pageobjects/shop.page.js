const { default: reporter } = require("../../helpers/reporter");
const Page = require("./page");

class ShopPage extends Page {
  get shopTitle() {
    return $('//h3[@class="category-hero-banner-custom-text__heading"]');
  }

  get sortingDropdown() {
    return $('//span[@class="mz-paging-sorttitle"]');
  }

  get sortOptions() {
    return $$("ul.mz-pagingcontrols-pagesort-dropdown li.ctracking");
  }

  get productsLeftNavLinks() {
    return $$('//body/div[@id="page-content"]/div[1]/div[1]/div[6]/div[1]/div[1]/ul[1]/li/a');
  }

  /**
   * Clicks on a specific sort option based on its text.
   *
   * @param {string} optionText - The text of the sort option to click.
   * @throws Will throw an error if the sort option with the given text is not found.
   */
  async clickSortOption(optionText) {
    try {
      for (let i = 0; i < (await this.sortOptions.length); i++) {
        if ((await this.sortOptions[i].getText()).includes(optionText)) {
          await this.sortOptions[i].click();
          reporter.addStep(
            "clickSortOption",
            "info",
            `Clicked on sort option: "${optionText}"`
          );
          return;
        }
      }
    } catch (error) {
      reporter.addStep(
        "clickSortOption",
        "error",
        `Sort option with text "${optionText}" not found.`
      );
      error.message = `${error.message}`;
      throw error;
    }
  }

  /**
   * Selects a product option from the left navigation bar based on the specified product type.
   *
   * @param {string} productType - The text of the product type to select from the left navigation bar.
   * @throws Will throw an error if the product option with the given text is not found in the left navigation bar.
   */
  async selectProductOptionFromLeftNavBar(productType) {
    try {
      for (let i = 0; i < await this.productsLeftNavLinks.length; i++) {
        const productlist =  await this.productsLeftNavLinks[i].getText();
        if (productlist.toLowerCase().includes(productType.toLowerCase())) {
          await this.productsLeftNavLinks[i].click();
          reporter.addStep(
            "selectProductOptionFromLeftNavBar",
            "info",
            `Clicked on product option: "${productType}"`
          );
          return;
        }
      }
    } catch (error) {
      reporter.addStep(
        "selectProductOptionFromLeftNavBar",
        "error",
        `Error while selecting product option: ${error.message}`
      );
      error.message = `${error.message}`;
      throw error;
    }
  }
}

module.exports = new ShopPage();

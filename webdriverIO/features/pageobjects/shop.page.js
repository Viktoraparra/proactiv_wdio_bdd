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

  /**
   * Clicks on a specific sort option based on its text.
   *
   * @param {string} optionText - The text of the sort option to click.
   * @throws Will throw an error if the sort option with the given text is not found.
   */
  async clickSortOption(optionText) {
    const options = await this.SortOptions();
    for (let option of options) {
      if ((await option.getText()).includes(optionText)) {
        await option.click();
        return;
      }
    }
    throw new Error(`Sort option with text "${optionText}" not found.`);
  }
}

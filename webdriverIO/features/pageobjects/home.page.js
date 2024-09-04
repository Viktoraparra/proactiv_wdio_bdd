const { default: reporter } = require("../../helpers/reporter");
const Page = require("./page");

class HomePage extends Page {
  get form() {
    return $('//form[@data-testid="klaviyo-form-V2HVPL"]');
  }
  get closeFormBtn() {
    return $(
      '//button[@class="needsclick klaviyo-close-form go260142404 kl-private-reset-css-Xuajs1"]'
    );
  }
  get loginBtn() {
    return $("//img[@title='Sign In']");
  }

  /**
   * Opens the home page by navigating to the base URL.
   * Verifies that the page title is correct after opening.
   */
  async open() {
    try {
      reporter.addStep(
        "open",
        "info",
        "Opening the base URL: " + process.env.BASE_URL
      );
      await super.open(process.env.BASE_URL);
      await expect(browser).toHaveTitle("For All Skin Types | Acne & Skincare Treatment | Proactiv®");
      reporter.addStep("open", "info", "Successfully opened the base URL.");
    } catch (error) {
      reporter.addStep(
        "open",
        "error",
        `Failed to open the base URL: ${error.message}`
      );
      throw error;
    }
  }

  /**
   * Closes the form if it is currently displayed.
   * Logs a message if the form is not displayed and no action is needed.
   */
  async closeForm() {
    try {
      if (await this.form.isDisplayed()) {
        await this.closeFormBtn.click();
        reporter.addStep("closeForm", "info", "Form closed successfully.");
      } else {
        reporter.addStep(
          "closeForm",
          "info",
          "Form is not displayed. No action needed."
        );
      }
    } catch (error) {
      reporter.addStep(
        "closeForm",
        "error",
        `Error closing the form: ${error.message}`
      );
      throw error;
    }
  }

  /**
   * Clicks the login button to navigate to the login page.
   * Waits for the button to be clickable before performing the click action.
   */
  async clickLogin() {
    try {
      await this.loginBtn.waitForClickable();
      await this.loginBtn.click();
      reporter.addStep(
        "clickLogin",
        "info",
        "Login button clicked successfully."
      );
    } catch (error) {
      reporter.addStep(
        "clickLogin",
        "error",
        `Error clicking the login button: ${error.message}`
      );
      throw error;
    }
  }
}

module.exports = new HomePage();

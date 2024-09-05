const ConsLogin = require("../../data/ConsLogin.json");
const { default: reporter } = require("../../helpers/reporter");
const Page = require("./page");

class LoginPage extends Page {
  get headerLogin() {
    return $('//h1[@class="mz-pagetitle"]');
  }
  get subHeaderLogin() {
    return $("/html[1]/body[1]/div[3]/div[1]/div[2]/div[1]/div[1]/p[1]");
  }
  get emailField() {
    return $("#email");
  }

  get passwordField() {
    return $("#form-password");
  }

  get signInBtn() {
    return $('//button[@data-mz-action="loginpage-submit"]');
  }

  get emailErrorMsg() {
    return $("#invalidemail");
  }

  get passwordErrorMsg() {
    return $("#invalidpassword");
  }

  get sectionErrorMsg() {
    return $('//section[@data-mz-role="popover-message"]');
  }

  get welcomeSection() {
    return $("/html[1]/body[1]/div[2]/div[1]/div[2]/div[3]/div[1]/h1[1]");
  }

  /**
   * Handles the login process and validates the outcome based on the provided scenario.
   * @param {string} outcome - The expected outcome of the login process.
   */
  async loginAndErrorMsg(outcome) {
    reporter.addStep(
      "loginAndErrorMsg",
      "info",
      `Validating outcome: ${outcome}`
    );
    try {
      switch (outcome) {
        case "successfull Login":
          await this.successLoginValidation();
          break;
        case "empty email and empty password":
          await this.emptyEmailAndPassword();
          break;
        case "invalid email format":
          await this.invalidEmailFormatMsg();
          break;
        case "invalid password format":
          await this.invalidPasswordFormatMsg();
          break;
        case "invalid email and password format":
          await this.invalidEmailFormatMsg();
          await this.invalidPasswordFormatMsg();
          break;
        case "noneExistingUser":
          await this.invalidUserLogin();
          break;
        default:
          throw new Error(`Unknown outcome: ${outcome}`);
      }
    } catch (error) {
      reporter.addStep(
        "loginAndErrorMsg",
        "error",
        `Error validating outcome: ${error.message}`
      );
      throw error;
    }
  }

  /**
   * Validates the presence and correctness of error messages when both email and password fields are empty.
   */
  async emptyEmailAndPassword() {
    try {
      reporter.addStep(
        "emptyEmailAndPassword",
        "info",
        "Validating empty email and password error messages"
      );
      await expect(await this.emailErrorMsg).toBeDisplayed();
      await expect(await this.emailErrorMsg.getText()).toEqual(
        ConsLogin.emptyEmailMsg
      );
      await expect(await this.passwordErrorMsg).toBeDisplayed();
      await expect(await this.passwordErrorMsg.getText()).toEqual(
        ConsLogin.emptyPasswordMsg
      );
    } catch (error) {
      reporter.addStep(
        "emptyEmailAndPassword",
        "error",
        `Error in validation: ${error.message}`
      );
      throw error;
    }
  }
  /**
   * Validates the presence and correctness of the error message for an invalid email format.
   */
  async invalidEmailFormatMsg() {
    try {
      reporter.addStep(
        "invalidEmailFormatMsg",
        "info",
        "Validating invalid email format error message"
      );
      await expect(await this.emailErrorMsg).toBeDisplayed();
      await expect(await this.emailErrorMsg.getText()).toEqual(
        ConsLogin.invalidEmailMsg
      );
    } catch (error) {
      reporter.addStep(
        "invalidEmailFormatMsg",
        "error",
        `Error in validation: ${error.message}`
      );
      throw error;
    }
  }

  /**
   * Validates the presence and correctness of the error message for an invalid password format.
   */
  async invalidPasswordFormatMsg() {
    try {
      reporter.addStep(
        "invalidPasswordFormatMsg",
        "info",
        "Validating invalid password format error message"
      );
      await expect(await this.passwordErrorMsg).toBeDisplayed();
      await expect(await this.passwordErrorMsg.getText()).toEqual(
        ConsLogin.invalidPasswordMsg
      );
    } catch (error) {
      reporter.addStep(
        "invalidPasswordFormatMsg",
        "error",
        `Error in validation: ${error.message}`
      );
      throw error;
    }
  }

  /**
   * Validates the presence and correctness of the error message for an invalid user login.
   */
  async invalidUserLogin() {
    try {
      reporter.addStep(
        "invalidUserLogin",
        "info",
        "Validating invalid user login error message"
      );
      await expect(await this.sectionErrorMsg).toBeDisplayed();
      await expect(await this.sectionErrorMsg.getText()).toEqual(
        ConsLogin.invalidEmailPasswordMsg
      );
    } catch (error) {
      reporter.addStep(
        "invalidUserLogin",
        "error",
        `Error in validation: ${error.message}`
      );
      throw error;
    }
  }

  /**
   * Validates the successful login by checking the welcome message and page title.
   */
  async successLoginValidation() {
    try {
      reporter.addStep(
        "successLoginValidation",
        "info",
        "Validating successful login"
      );
      const actualText = await this.welcomeSection.getText();
      const normalizedText = actualText.replace(/\s+/g, " ").trim();
      await expect(browser).toHaveTitle("member-dashboard");
      await expect(await this.welcomeSection).toExist();
      await expect(normalizedText).toEqual(ConsLogin.successLogin);
    } catch (error) {
      reporter.addStep(
        "successLoginValidation",
        "error",
        `Error validating successful login: ${error.message}`
      );
      throw error;
    }
  }

  /**
   * Verifies that the login page is correctly displayed by checking the header and subheader texts.
   */
  async verifyLoginPage() {
    try {
      await this.headerLogin.waitForExist();
      reporter.addStep(
        "verifyLoginPage",
        "info",
        "Header found on the login page."
      );
      await expect(await this.headerLogin.getText()).toContain("Sign In");

      const subHeaderText = await this.subHeaderLogin.getText();
      await expect(subHeaderText).toEqual(
        "Do you have an online Proactiv account? If so, sign in below."
      );
      reporter.addStep(
        "verifyLoginPage",
        "info",
        "Login page header and subheader verified successfully."
      );
    } catch (error) {
      reporter.addStep(
        "verifyLoginPage",
        "error",
        `Error verifying login page: ${error.message}`
      );
      error.message = `Error verifying login page: ${error.message}`
      throw error;
    }
  }

  /**
   * Enters the specified email into the email field.
   * @param {string} email - The email to be entered.
   */
  async enterEmail(email) {
    try {
      email = email.trim();
      await this.emailField.setValue(email);
      reporter.addStep(
        "enterEmail",
        "info",
        `Email: ${email} entered successfully.`
      );
    } catch (error) {
      reporter.addStep(
        "enterEmail",
        "error",
        `Error populating email field: ${error.message}`
      );
      error.message = `Error entering email: ${email}, ${error.message}`;
      throw error;
    }
  }

  /**
   * Enters the specified password into the password field.
   * @param {string} password - The password to be entered.
   */
  async enterPassword(password) {
    // if (!password) throw new Error(`Given password is not valid`);
    try {
      password = password.trim();
      await this.passwordField.setValue(password);
      reporter.addStep(
        "enterPassword",
        "info",
        `Password entered successfully.`
      );
    } catch (error) {
      reporter.addStep(
        "enterPassword",
        "error",
        `Error populating password field: ${error.message}`
      );
      error.message = `Error entering password: ${error.message}`;
      throw error;
    }
  }

  /**
   * Clicks the Sign In button to submit the login form.
   */
  async clickSignIn() {
    try {
      await this.signInBtn.click();
      reporter.addStep(
        "clickSignIn",
        "info",
        "Sign In button clicked successfully."
      );
    } catch (error) {
      reporter.addStep(
        "clickSignIn",
        "error",
        `Error clicking Sign In button: ${error.message}`
      );
      error.message = `Error clicking Sign In button: ${error.message}`;
      throw error;
    }
  }

  /**
   * Executes the complete login process by entering the email and password and clicking Sign In.
   * @param {string} email - The email to be used for login.
   * @param {string} password - The password to be used for login.
   */
  async login(email, password) {
    try {
      await this.enterEmail(email);
      await this.enterPassword(password);
      await this.clickSignIn();
      reporter.addStep(
        "login",
        "info",
        "Login process completed successfully."
      );
    } catch (error) {
      reporter.addStep(
        "login",
        "error",
        `Error during the login process: ${error.message}`
      );
      error.message = `${error.message}`;
      throw error;
    }
  }
}

module.exports = new LoginPage();

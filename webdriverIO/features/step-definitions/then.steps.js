const { Then } = require("@wdio/cucumber-framework");
const ConsLogin = require("../../data/ConsLogin.json");
const loginPage = require("../pageobjects/login.page");

Then(/^User should see (.*)$/, async (outcome) => {
  await loginPage.loginAndErrorMsg(outcome);

  //   const emailErrorMsg = await $("#invalidemail");
  //   const passwordErrorMsg = await $("#invalidpassword");
  //   const sectionErrorMsg = await $('//section[@data-mz-role="popover-message"]');
  //   const UserLogedField = await $(
  //     "/html[1]/body[1]/div[2]/div[1]/div[2]/div[3]/div[1]/h1[1]"
  //   );

  //   switch (outcome) {
  //     case "successfull Login":
  //       const actualText = await UserLogedField.getText();
  //       const normalizedText = actualText.replace(/\s+/g, " ").trim();
  //       await expect(browser).toHaveTitle("member-dashboard");
  //       await expect(await UserLogedField).toExist();
  //       await expect(normalizedText).toEqual(
  //         ConsLogin.successLogin
  //       );

  //       break;
  //     case "empty email and empty password":
  //       await expect(await emailErrorMsg).toBeDisplayed();
  //       await expect(await emailErrorMsg.getText()).toEqual(
  //         ConsLogin.emptyEmailMsg
  //       );
  //       await expect(await passwordErrorMsg).toBeDisplayed();
  //       await expect(await passwordErrorMsg).toEqual(ConsLogin.emptyPasswordMsg);
  //       break;
  //     case "invalid email format":
  //       await expect(await emailErrorMsg).toBeDisplayed();
  //       await expect(await emailErrorMsg.getText()).toEqual(
  //         ConsLogin.invalidEmailMsg
  //       );
  //       break;
  //     case "invalid password format":
  //       await expect(await passwordErrorMsg).toBeDisplayed();
  //       await expect(await passwordErrorMsg.getText()).toEqual(
  //         ConsLogin.invalidPasswordMsg
  //       );
  //       break;

  //     case "invalid email and password format":
  //       await expect(await emailErrorMsg).toBeDisplayed();
  //       await expect(await emailErrorMsg.getText()).toEqual(
  //         ConsLogin.invalidEmailMsg
  //       );
  //       await expect(await passwordErrorMsg).toBeDisplayed();
  //       await expect(await passwordErrorMsg.getText()).toEqual(
  //         ConsLogin.invalidPasswordMsg
  //       );
  //       break;
  //     case "noneExistingUser":
  //       await expect(await sectionErrorMsg).toBeDisplayed();
  //       await expect(await sectionErrorMsg.getText()).toEqual(
  //         ConsLogin.invalidEmailPasswordMsg
  //       );
  //       break;
  //     default:
  //       throw new Error(`Unknown outcome: ${outcome}`);
  //   }
});

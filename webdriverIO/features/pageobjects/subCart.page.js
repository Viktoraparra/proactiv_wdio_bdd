const { default: reporter } = require("../../helpers/reporter");
const Page = require("./page");

class SubCartPage extends Page {
  get subCartTitle() {
    return $(
      "/html[1]/body[1]/header[1]/nav[1]/div[1]/div[3]/li[1]/div[1]/div[2]/div[2]/div[1]/div[1]/p[1]/span[1]"
    );
  }

  get subCartCloseBtn() {
    return $(
      "/html[1]/body[1]/header[1]/nav[1]/div[1]/div[3]/li[1]/div[1]/div[2]/div[2]/div[1]/img[1]"
    );
  }

  get subCartProductTitles() {
    return $$(
      "/html[1]/body[1]/header[1]/nav[1]/div[1]/div[3]/li[1]/div[1]/div[2]/div[2]/div[1]/div/div[2]/div[1]/div[1]/p[1]"
    );
  }

  get subCartProductPrices() {
    return $$(
      "//p[@class='price-icon']"
    );
  }

  get subCartToolTipBtn() {
    return $$(
      "/html[1]/body[1]/header[1]/nav[1]/div[1]/div[3]/li[1]/div[1]/div[2]/div[2]/div[1]/div/div[2]/div[1]/div[2]/div[1]/div[1]"
    );
  }

  get subCartToolTipInfo() {
    return $$(
      "/html[1]/body[1]/header[1]/nav[1]/div[1]/div[3]/li[1]/div[1]/div[2]/div[2]/div[1]/div/div[2]/div[1]/div[2]/div[1]/div[2]"
    );
  }

  get subCartProductQty() {
    return $$(
      "//p[@class='price-quantity' and contains(normalize-space(), 'Qty:')]"
    );
  }

  get subCartRemoveProductOfCart() {
    return $$(
      "/html[1]/body[1]/header[1]/nav[1]/div[1]/div[3]/li[1]/div[1]/div[2]/div[2]/div[1]/div/div[2]/div[1]/div[1]/span[1]"
    );
  }

  get subCartViewCartBtn() {
    return $(
      "div[class='col-icon col-icon--cart'] button[class='cart-checkout']"
    );
  }

  get subCartCheckoutBtn() {
    return $(
      "//div[@class='col-icon col-icon--cart']//button[@class='mz-button mz-button-large mz-carttable-button-active cart-checkout'][normalize-space()='checkout']"
    );
  }
  async getTitleOfProductInCart(index) {
    return await this.subCartProductTitles[index].getText();
  }

  async getQtyfProductInCart(index) {
    return await this.subCartProductQty[index].getText();
  }

  async getPriceOfProductInCart(index) {
    return await this.subCartProductPrices[index].getText();
  }

  async validateProductInCart(productTitle, productQty, productPrice) {
    try {
      const productsCount = await this.subCartProductTitles.length;

      if (productsCount === 0) {
        throw new Error("The cart is empty. No products to validate.");
      }

      if (productsCount === 1) {
        await this.validateSingleProduct(
          productTitle,
          productQty,
          productPrice
        );
        reporter.addStep(
          "validate Amount of products in cart",
          "info",
          `Validation Quantity of product is equal to 1`
        );
      } else {
        await this.validateMultipleProducts(
          productTitle,
          productQty,
          productPrice
        );
        reporter.addStep(
          "validate Amount of products in cart",
          "info",
          `Validation Quantity of product is greater of 1`
        );
      }
    } catch (error) {
      reporter.addStep(
        "validate Amount of products in cart",
        "error",
        `Validation failed: ${error.message}`
      );
      error.message = `${error.message}`;
      throw error;
    }
  }

  //  console.log(`Price text retrieved: ${priceText}`);

  async validateSingleProduct(productTitle, productQty, productPrice) {
    try {
      const title = await this.getTitleOfProductInCart(0);
      const qtyText = await this.getQtyfProductInCart(0);
      const priceText = await this.getPriceOfProductInCart(0);

      const qty =
        qtyText && typeof qtyText === "string"
          ? parseInt(qtyText.replace("Qty: ", ""))
          : NaN;

      const price =
        priceText && typeof priceText === "string"
          ? parseFloat(priceText.replace("$", ""))
          : NaN;


      if (isNaN(price)) {
        throw new Error(`Failed to parse price. Received: ${priceText}`);
      }

      if (isNaN(qty)) {
        throw new Error(`Failed to parse quantity. Received: ${qtyText}`);
      }

      console.log(`Title: ${title}`);
      console.log(`Quantity: ${qty}`);
      console.log(`Price: ${price}`);

      await expect(title.toLowerCase()).toEqual(productTitle.toLowerCase());
      await expect(qty).toEqual(parseInt(productQty));
      await expect(price).toEqual(parseFloat(productPrice));

      reporter.addStep(
        "validateSingleProduct",
        "info",
        `Single product "${title}" is validated successfully`
      );
    } catch (error) {
      reporter.addStep(
        "validate Amount of products in cart",
        "error",
        `Validation failed: ${error.message}`
      );
      error.message = `${error.message}`;
      throw error;
    }
  }

  async validateMultipleProducts(productTitle, productQty, productPrice) {
    try {
      for (let i = 0; i < (await this.subCartProductTitles.length); i++) {
        const title = await this.getTitleOfProductInCart(i);
        const qtyText = await this.getQtyfProductInCart(i);
        const priceText = await this.getPriceOfProductInCart(i);

        const qty =
          qtyText && typeof qtyText === "string"
            ? parseInt(qtyText.replace("Qty: ", ""))
            : NaN;

        const price =
          priceText && typeof priceText === "string"
            ? parseFloat(priceText.replace("$", ""))
            : NaN;

        if (isNaN(price)) {
          throw new Error(`Failed to parse price. Received: ${priceText}`);
        }

        if (isNaN(qty)) {
          throw new Error(`Failed to parse quantity. Received: ${qtyText}`);
        }

        await expect(title.toLowerCase()).toContain(productTitle.toLowerCase());
        await expect(qty).toEqual(parseInt(productQty));
        await expect(price).toEqual(parseFloat(productPrice));
        reporter.addStep(
          "validateProductInCart",
          "info",
          `Product "${title}" is validated successfully`
        );
      }
    } catch (error) {
      reporter.addStep(
        "validates products title in cart",
        `Validation failed: ${error.message}`
      );
      error.message = `${error.message}`;
      throw error;
    }
  }
}

module.exports = new SubCartPage();

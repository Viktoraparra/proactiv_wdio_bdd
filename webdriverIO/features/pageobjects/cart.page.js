const consMyCart = require("../../data/consMyCart.json");
const { default: reporter } = require("../../helpers/reporter");

class CartPage {
    get cartPageHeader(){
        return $('.mz-pagetitlecart')
    }

    get cartProductTitle(){
        return $$('//a[@class="mz-carttable-item-title"]')
    }

    get cartProductQtySelector(){
        return $$("//select[@class='mz-carttable-qty-field']")
    }

    get cartProductPrice(){
        return $$('//span[@class="mz-item-rowtotal is-saleprice"]')
    }

    /**
   * Validates the header title of the cart page.
   * 
   * This method checks if the header of the cart page exists and matches the expected title.
   * 
   * @throws Will throw an error if the cart page header does not match the expected title.
   */
    async validateCartPageHeader(){
        try {
            await this.cartPageHeader.waitForExist()
        const headerTitle = await this.cartPageHeader.getText();
        await expect(headerTitle.toLowerCase()).toEqual(consMyCart.Title.toLowerCase());
        reporter.addStep(
            "validateCartPageHeader",
            "info",
            `Successfully validated the cart page header as: "${headerTitle}".`
          );
        } catch (error) {
            reporter.addStep(
                "validate cart page header",
                "error",
                `Validation failed: ${error.message}`
              ); 
              error.message = `${error.message}`;
      throw error;
        }
        
    }

  /**
   * Retrieves the title of a product in the cart by index.
   * 
   * @param {number} index - The index of the product in the cart.
   * @returns {Promise<string>} The title of the product.
   */
    async getTitleOfProductInCart(index) {
        return await this.cartProductTitle[index].getText();
      }
   
        /**
   * Retrieves the quantity of a product in the cart by index.
   * 
   * @param {number} index - The index of the product in the cart.
   * @returns {Promise<string>} The quantity of the product as text.
   */
      async getQtyfProductInCart(index) {
        return await this.cartProductQtySelector[index].getText();
      }
    
        /**
   * Retrieves the price of a product in the cart by index.
   * 
   * @param {number} index - The index of the product in the cart.
   * @returns {Promise<string>} The price of the product as text.
   */
      async getPriceOfProductInCart(index) {
        return await this.cartProductPrice[index].getText();
      }

  /**
   * Validates a product in the cart based on its title, quantity, and price.
   * 
   * This method checks the cart for the presence of a single or multiple products
   * and validates their title, quantity, and price against the expected values.
   * 
   * @param {string} productTitle - The expected title of the product.
   * @param {string} productQty - The expected quantity of the product.
   * @param {string} productPrice - The expected price of the product.
   * @throws Will throw an error if validation fails.
   */
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

  /**
   * Validates a single product in the cart.
   * 
   * This method checks the title, quantity, and price of a single product in the cart
   * against the expected values.
   * 
   * @param {string} productTitle - The expected title of the product.
   * @param {string} productQty - The expected quantity of the product.
   * @param {string} productPrice - The expected price of the product.
   * @throws Will throw an error if validation fails.
   */
  async validateSingleProduct(productTitle, productQty, productPrice) {
    try {
      const title = await this.getTitleOfProductInCart(0);
      const qtyText = await this.getQtyfProductInCart(0);
      const priceText = await this.getPriceOfProductInCart(0);
      
      const price =
        priceText && typeof priceText === "string"
          ? parseFloat(priceText.replace("$", ""))
          : NaN;


      if (isNaN(price)) {
        throw new Error(`Failed to parse price. Received: ${priceText}`);
      }

      await expect(title.toLowerCase()).toEqual(productTitle.toLowerCase());
      await expect(qty).toEqual(parseInt(productQty));
      await expect(price).toEqual(parseFloat(productPrice));

      reporter.addStep(
        "validate single product",
        "info",
        `Single product "${title}" is validated successfully`
      );
    } catch (error) {
      reporter.addStep(
        "validate single product",
        "error",
        `Validation failed: ${error.message}`
      );
      error.message = `${error.message}`;
      throw error;
    }
  }

    /**
   * Validates multiple products in the cart.
   * 
   * This method iterates through all products in the cart and validates their title,
   * quantity, and price against the expected values.
   * 
   * @param {string} productTitle - The expected title of the products.
   * @param {string} productQty - The expected quantity of the products.
   * @param {string} productPrice - The expected price of the products.
   * @throws Will throw an error if validation fails.
   */
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
            "validate multiple products",
            "info",
            `Product "${title}" is validated successfully with quantity: ${qty} and price: $${price}.`
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


module.exports = new CartPage()
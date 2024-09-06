Feature: Adding Products to cart

  @Cart @Regression
  Scenario: <TestID>: User logs in and navigates to shop page navigates to specific type of product
    Given User logs in with email <email> and password <password>
    Then User should see <outcome>
    When User navigates to the shop page
    Then User should navigates to <productType>
    When User is on <productType> validates available products

    Examples:
      | TestID    | email                   | password  | productType | outcome           |
      | CRT_TC001 | gproactiv+bgr@gmail.com | Tpcweb123 | Masks       | successfull Login |

      # For this Scenario for executing is requiered to have mini-cart empty of products
      # need to indicated is failling due existing duplicates elements int the domain

  @Cart
  Scenario: <TestID>: User add Mask product to cart
    Given User logs in with email <email> and password <password>
    Then User should see <outcome>
    When User navigates to the shop page
    Then User should navigates to <productType>
    When User add <product> to cart
    Then User validates the <product> the <qty> and the <price> subcart

    Examples:
      | TestID    | email                   | password  | outcome           | productType | product                         | qty | price |
      | CRT_TC002 | gproactiv+bgr@gmail.com | Tpcweb123 | successfull Login | Masks       | Amazonian Clay Mask (3 oz/28 g) |   1 |    32 |
    # For this Scenario for executing is requiered to have mini-cart empty of products

  @Cart @Smoke
  Scenario: <TestID>: User add Mask product to cart and navigatest to cartpage
    Given User logs in with email <email> and password <password>
    Then User should see <outcome>
    When User navigates to the shop page
    Then User should navigates to <productType>
    When User add <product> to cart
    Then User clicks view cart
    Then validates the <product> the <qty> and the <price>

    Examples:
      | TestID    | email                   | password  | outcome           | productType | product                       | qty | price |
      | CRT_TC002 | gproactiv+bgr@gmail.com | Tpcweb123 | successfull Login | Treatments  | ProactivMD Adapalene Gel 0.1% |   1 | 14.40 |

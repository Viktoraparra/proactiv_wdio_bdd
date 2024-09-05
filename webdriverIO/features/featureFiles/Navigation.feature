Feature: Navigation to pages

  @Nav
  Scenario: <TestID>: User logs in and navigates to featured page validate all featured products and navigates to asepcific product page
    Given User logs in with email <email> and password <password>
    When User navigates to the Feature page
    Then User should validates the title and description of each product
    When User clicks on <product> and navigates to product page
    Then User validates <product> page and validate <price>

    Examples:
      | TestID    | email                   | password  | product           | price |
      | NAV_TC001 | gproactiv+bgr@gmail.com | Tpcweb123 | Emergency Blemish |  17.6 |

  Scenario: <TestID>: User logs in and navigates to shop page navigates to specific type of product
    Given User logs in with email <email> and password <password>
    When User navigates to the shop page
    Then User should navigates to <productType>
    When User is on <productType> validates available products

    Examples:
      | TestID    | email                   | password  | productType |
      | NAV_TC002 | gproactiv+bgr@gmail.com | Tpcweb123 | Masks       |

  Scenario: <TestID>: User logs in and navigates to shop page sort products by selection
    Given User logs in with email <email> and password <password>
    When User navigates to the shop page
    Then User sort products by <Sorting>

    Examples:
      | TestID    | email                   | password  | productType |
      | NAV_TC003 | gproactiv+bgr@gmail.com | Tpcweb123 | low to high |

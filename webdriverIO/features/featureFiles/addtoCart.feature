Feature: Adding Products to cart

  @Nav
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
Feature: Adding Products to cart

  @Cart @Smoke
  Scenario: <TestID>: User logs in and navigates to shop page navigates to specific type of product
    Given User logs in with email <email> and password <password>
    Then User should see <outcome>
    When User navigates to the shop page
    Then User should navigates to <productType>
    When User is on <productType> validates available products

    Examples:
      | TestID    | email                   | password  | productType | outcome                           |
      | CRT_TC001 | gproactiv+bgr@gmail.com | Tpcweb123 | Masks       | successfull Login                 |

  @Regression @Cart  
  Scenario: <TestID>: User logs in and navigates to shop page sort products by selection
    Given User logs in with email <email> and password <password>
    When User navigates to the shop page
    Then User sort products by <Sorting>

    Examples:
      | TestID    | email                   | password  | productType |
      | CRT_TC003 | gproactiv+bgr@gmail.com | Tpcweb123 | low to high |
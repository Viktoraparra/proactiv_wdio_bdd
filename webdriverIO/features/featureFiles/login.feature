Feature: Login functionality
  Validation of login
  @Regresion
  Scenario Outline: <TestID>: User tries to login with different combinations of email and password
    Given User is on main page and navigates to login page
    When User enters <email> and <password>
    Then User should see <outcome>

    Examples:
      | TestID      | email                   | password    | outcome                           |
      | LOGIN_TC001 | gproactiv+bgr@gmail.com | Tpcweb123   | successfull Login                 |
      | LOGIN_TC002 |                         |             | empty email and empty password    |
      | LOGIN_TC003 | gerardo                 | Tpcweb123   | invalid email format              |
      | LOGIN_TC004 | gproactiv+bgr@gmail.com | asdf        | invalid password format           |
      | LOGIN_TC005 | gproactiv+bgr@gmail.com |        1234 | invalid password format           |
      | LOGIN_TC006 | invalid                 |        1234 | invalid email and password format |
      | LOGIN_TC007 | gproactiv+bgr@gmail.com | Tpcweb123as | noneExistingUser                  |
      | LOGIN_TC008 | gproactiv@dmail.com     | Tpcweb123   | noneExistingUser                  |

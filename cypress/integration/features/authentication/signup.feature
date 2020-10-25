@signup
Feature: I want to test the sign out process for state

Scenario: Go to todos
    Then I am redirected to signin page
    When Click link "Dont have an account?"
    Then I am redirected to signup page
    Then No error message is displayed

    When Click Button "SIGN UP"

    Then Error Message "email field is required" is visible
    And Error Message "password field is required" is visible
    And Button "SIGN UP" is disabled

    When Enter "cypress-usergmail.com" in input field with label "Email Address"
    Then Error Message "this is not a valid email address" is visible
    Then Clear input field with label "Email Address"
    When Enter "cyp" in input field with label "Email Address"
    Then Error Message "we need at least 6 Charakters" is visible
    Then Clear input field with label "Email Address"
    Then Enter "cypress-user@gmail.com" in input field with label "Email Address"
    And Press Tab key
    When Enter "123" in input field with label "Password"
    Then Error Message "for a valid Password we need at least 8 Charakters" is visible
    Then Clear input field with label "Password"
    When Enter "123456789" in input field with label "Password"

    When Enter "999999999" in input field with label "Confirm Password"
    When Click Button "Sign Up" 
    Then Toast responds with text "Your passwords are not equal" 
    And Clear input field with label "Confirm Password"

    When Enter "123456789" in input field with label "Confirm Password"
    Then No error message is displayed
    
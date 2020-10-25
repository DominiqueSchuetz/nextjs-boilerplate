@signin
Feature: I want to test the sign in process for state

Scenario: Go to todos
    Then I am redirected to signin page

Scenario: I want to test the validation of the input fields
    When Click Button "Sign In"
    Then Error Message "email field is require" is visible
    And Error Message "password field is required" is visible
    And Button "SIGN IN" is disabled
    When Enter "schuetzgmail.com" in input field with label "Email Address"
    Then Error Message "this is not a valid email address" is visible
    Then Clear input field with label "Email Address"
    When Enter "sch" in input field with label "Email Address"
    Then Error Message "we need at least 6 Charakters" is visible
    Then Clear input field with label "Email Address"
    Then Enter "schuetz@gmail.com" in input field with label "Email Address"
    And Press Tab key
    When Enter "123" in input field with label "Password"
    Then Error Message "for a valid Password we need at least 8 Charakters" is visible
    Then Clear input field with label "Password"
    When Enter "123456789" in input field with label "Password"
    Then No error message is displayed

Scenario: I want to test the validation of wrong firebase requests
    When Enter "unknown-user@gmail.com" in input field with label "Email Address"
    And Enter "123456789" in input field with label "Password" 
    And Click Button "SIGN IN"
    Then Toast responds with text "There is no user record corresponding to this identifier. The user may have been deleted."
    Then Click on Toast
    Then No Toast is visible

Scenario: I want to be redirected if i am succuessfully signed in
    When Enter "schuetz@gmail.com" in input field with label "Email Address"
    And Enter "123456789" in input field with label "Password" 
    And Click Button "SIGN IN"
    Then Toast responds with text "Hey, you are successfully logged in!"
    And I am redirected to todos page
    
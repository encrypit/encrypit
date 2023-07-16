Feature: Error
  Scenario: I see file rejection error if I upload too many files
    Given I visit "/"
    When I get element by selector "input[type=file]"
      And I select file "cypress/fixtures/example.json"
        | force | true |
      And I select file "cypress/fixtures/example.json"
        | force | true |
    Then I see text "Too many files"
    When I click on label "Close"
    Then I do not see text "Too many files"

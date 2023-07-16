Feature: Error
  Scenario: I cannot upload multiple files
    Given I visit "/"
    When I get element by selector "input[type=file]"
      And I select file "cypress/fixtures/example.json"
        | force | true |
    Then I see text "example.json"
    When I select file "cypress/fixtures/example.json"
      | force | true |
    Then I see text "Too many files"
    When I click on label "Close"
    Then I do not see text "Too many files"

  Scenario: I cannot upload a file larger than 5MB
    Given I visit "/"
    When I get element by selector "input[type=file]"
      And I select file "cypress/fixtures/6MB"
        | force | true |
    Then I see text "File is larger than 5242880 bytes"
      And I do not see text "6MB"
    When I click on label "Close"
    Then I do not see text "File is larger than 5242880 bytes"

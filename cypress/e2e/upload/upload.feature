Feature: Upload
  Scenario: As a user, I can upload a file so that I can use the service
    Given I visit "/"
    Then I see link "Encrypit"
      And I see heading "New file"

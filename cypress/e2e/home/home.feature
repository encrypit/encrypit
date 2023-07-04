Feature: Home
  Scenario: As a user, I see the homepage
    Given I visit "/"
    Then I see heading "Encrypt file"
      And I see button "Drag and drop your file"
      And I see text "1 file max and 5 MB limit"

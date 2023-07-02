Feature: Home
  Scenario: As a user, I can see the homepage
    Given I visit "/"
    Then I see link "Encrypit"
      And I see heading "New file"
      And I see button "Drag and drop your file"
      And I see text "1 file max and 5 MB limit"
      And I see label "Privacy"
      And I see label "GitHub"

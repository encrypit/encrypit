Feature: Home
  Scenario: As a user, I can go to the homepage so that I can see the site
    Given I visit "/"
    Then I see text "Encrypit"

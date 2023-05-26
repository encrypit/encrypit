Feature: Home
  Scenario: As a user, I can view the homepage so that I am on the site
    Given I visit "/"
    Then I see text "Encrypit"

Feature: 404
  Scenario: As a user, I see the 404 page so that the page is not found
    Given I visit "/404"
    Then I see document title "Not Found"
      And I see heading "Not Found"
      And I see text "Go home"
    When I click on link "home"
    Then I see URL "/"
      And I see document title "Encrypit"

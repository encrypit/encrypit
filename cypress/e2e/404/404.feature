Feature: 404
  Scenario: I see the 404 page
    Given I visit "/404"
    Then I see document title "Not Found"
      And I see heading "Not Found"
      And I see text "Return to home"
    When I click on link "home"
    Then I see URL "/"
      And I see document title "Encrypit"

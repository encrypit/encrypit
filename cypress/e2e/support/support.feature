Feature: Support
  Scenario: As a user, I see the support page
    Given I visit "/support"
    Then I see document title "Encrypit Support"
      And I see heading "Support"
      And I see link "support@encrypit.com"
    When I click on link "Privacy Policy"
    Then I see URL "/privacy"
    When I click on label "Support"
    Then I see URL "/support"

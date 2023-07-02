Feature: Privacy
  Scenario: As a user, I see the privacy policy
    Given I visit "/privacy"
    Then I see document title "Encrypit Privacy Policy"
      And I see heading "Privacy Policy"
      And I see link "support@encrypit.com"
    When I click on label "Privacy"
    Then I see URL "/privacy"

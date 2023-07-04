Feature: FAQ
  Scenario: As a user, I see the FAQ
    Given I visit "/faq"
    Then I see document title "Encrypit FAQ"
      And I see heading "FAQ"
      And I see heading "Table of Contents"
      And I see link "supported"
      And I see link "Privacy Policy"

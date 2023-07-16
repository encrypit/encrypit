Feature: Header
  Scenario: I see the header
    Given I visit "/"
    Then I see link "Encrypit"
      And I see label "Support"
      And I see label "Privacy"
      And I see label "GitHub"

Feature: Invalid
  Scenario: I have invalid file key length
    Given I visit "/12345678"
    Then I see URL "/404"
    When I visit "/1234567890"
    Then I see URL "/404"

  Scenario: I have invalid file password length
    Given I visit "/123456789#12345678901"
    Then I see URL "/invalid"
    When I visit "/123456789#1234567890123"
    Then I see URL "/invalid"

  Scenario: I get message that file link is missing hash
    Given I visit "/123456789"
    Then I see URL "/invalid"
      And I see heading "File link invalid"
      And I see text "The link is incomplete or incorrect. Please make sure all the characters after the # are included."
    When I go back
    Then I do not see URL "/"

  Scenario: I cannot download an invalid file link
    Given I visit "/123456789#123456789012"
    Then I see URL "/123456789"
      And I see heading "Download and delete?"
      And I see text "You're about to download and delete the file with key 123456789"
    When I click on link "Yes, download the file"
    Then I see URL "/download"
      And I see heading "Download error"
      And I see text "File has been deleted or does not exist."
      And I see link "Upload file"
    When I go back
    Then I do not see URL "/"

Feature: Invalid
  Scenario: I get message that file link is missing hash
    Given I visit "/1234567"
    Then I see URL "/invalid"
      And I see heading "File link invalid"
      And I see text "The link is incomplete or incorrect. Please make sure all the characters after the # are included."
    When I go back
    Then I do not see URL "/"

  Scenario: I cannot download an invalid file link
    Given I visit "/1234567#123456789"
    Then I see URL "/1234567"
      And I see heading "Download and delete?"
      And I see text "You're about to download and delete the file with key 1234567"
    When I click on link "Yes, download the file"
    Then I see URL "/download"
      And I see heading "Download error"
      And I see text "File has been deleted or does not exist."
    When I go back
    Then I do not see URL "/"

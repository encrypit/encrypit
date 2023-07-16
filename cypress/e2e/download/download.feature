Feature: Download
  Scenario: I can download a file
    Given I visit "/"
    When I get element by selector "input[type=file]"
      And I select file "cypress/fixtures/example.json"
        | force | true |
      And I click on button "Upload"
      And I click on link "http://localhost:5173/"
    Then I see heading "Download and delete?"
      And I see text "You're about to download and delete the file with key"
      And I see link "Yes, download the file"
      And I see link "No, not now"
    When I click on link "Yes, download the file"
    Then I see URL "/download"
      And I see text "Download success!"
      And I see text "File has been deleted from the server. Please close this page after the download has finished."
      And I see link "Download file"
      And I see link "Upload file"
    When I click on link "Upload file"
    Then I see URL "/"
    When I go back
    Then I do not see URL "/"

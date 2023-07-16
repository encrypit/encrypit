Feature: Upload
  Scenario: I can upload and delete a file
    Given I visit "/"
    When I get element by selector "input[type=file]"
      And I select file "cypress/fixtures/example.json"
        | force | true |
    Then I see text "example.json"
    When I click on button "Upload"
    Then I see URL "/share"
      And I see heading "File link ready"
      And I see text "File will be deleted after download. (Or it will expire after 7 days.)"
      And I see link "http://localhost:5173/"
      And I see button "Copy link"
      And I see link "Email link"
    When I click on button "Delete file"
    Then I see heading "Are you sure you want to delete this file?"
      And I see text "This action cannot be undone."
    When I find buttons by text "Delete"
      And I get last element
      And I click
    Then I see URL "/"
    When I go back
    Then I do not see URL "/"

  Scenario: I can upload a 5MB file
    Given I visit "/"
    When I get element by selector "input[type=file]"
      And I select file "cypress/fixtures/5MB"
        | force | true |
    Then I see text "5MB"

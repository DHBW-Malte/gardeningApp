Feature: Delete Plant from Garden
  In order to remove a plant from a garden
  As a user
  I want to delete a plant from a garden

  Scenario: User deletes a plant from a garden
    Given the user is on the "Home" page
    When the user clicks on the "Garden" icon in the navigation bar
    Then the system loads the garden overview
    And the user is presented with a list of all gardens
    When the user selects a garden
    Then the system loads the garden details
    And the user is presented with a list of all plants in the garden
    When the user clicks on the "more options" icon of a plant
    And the user selects "delete plant"
    Then the system presents a confirmation dialog
    When the user confirms the deletion
    Then the plant is removed from the garden
    And the plant is deleted from the database
  Scenario: User views an overview of all gardens
    Given the user is on the "Home" page
    When the user clicks on the "Garden" icon in the navigation bar
    Then the system loads the garden overview
    And the user is presented with a list of all gardens
    And each garden card contains the garden name, an image of the garden, and the status of the garden
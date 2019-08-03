Feature: Auth

  Scenario: Auth when i am not authenticated
    Given I am not authenticated
    And Admin user exists
    When I access auth mutation with '{"login": "admin", "password": "admin"}'
    Then Gotten 'auth'.'accessToken' is not empty string
    And Gotten 'auth'.'refreshToken' is not empty string

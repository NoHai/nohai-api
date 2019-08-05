Feature: Auth

  Scenario: Auth when i am not authenticated and credentials are right
    Given I am not authenticated
    And Admin user exists
    When I access auth mutation with '{"login": "admin", "password": "admin"}'
    Then Gotten 'auth'.'accessToken' is not empty string
    And Gotten 'auth'.'refreshToken' is not empty string

  Scenario: Auth when i am not authenticated and credentials are wrong
    Given I am not authenticated
    When I access auth mutation with '{"login": "wrong", "password": "wrong"}'
    Then Gotten data is null
    And Gotten errors is not null

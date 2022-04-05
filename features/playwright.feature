@foo
Feature: Playwright tests

  Background:
    Given Go to the playwright website

  @runMe
  Scenario: Failing test
    Then I get an error

  Scenario: Passing test
    Then I get a passing test

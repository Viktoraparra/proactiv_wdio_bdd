## WebdriverIO Test Automation

# Overview
This repository contains test automation scripts using WebdriverIO, a popular JavaScript-based end-to-end testing framework. The tests are designed to validate user interactions and functionality on the Proactive application.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)

## Features

- **End-to-End Testing**: Automated tests using WebdriverIO.
- **Reporting**: Allure reports for detailed test results.

## Requirements

- Node.js (v16.x or later)
- Git
- A GitHub account for repository access
- [Visual Studio Code](https://code.visualstudio.com/) (Optional but recommended)

## Installation

### Prerequisites
- Node.js: Ensure that Node.js is installed on your machine. You can download it from nodejs.org.

- Git: Ensure Git is installed for version control. You can download it from git-scm.com.

### Installation
Clone the Repository

``
git clone <repository-url>
cd <repository-directory>
``

### Install Dependencies

Install the required Node.js packages by running:

``npm install``

### Configuration

Environment Variables

npm install
Configuration
Environment Variables

Ensure that the environment variables are set up correctly in your .env file or directly in your environment. The key environment variable used in this project is BASE_URL.

### WebdriverIO Configuration

The configuration for WebdriverIO is located in wdio.conf.js. This file defines the test framework, reporters, and services used for running tests.

### Running Tests

#### Run Tests Locally

To run the WebdriverIO tests locally, use the following npm script:

Use the following npm scripts to execute the tests:

#### Run all tests

``npm test``

Run specific test categories:

#### Regression Tests

``npm run regression``

#### Navigation Tests

``npm run test:nav``

#### Login Tests

``npm run test:login``

#### Cart Tests

``npm run test:cart``

#### Smoke Tests

``npm run test:smoke``

#### Regression Tests (alternative)

``npm run test:regression``

#### Login and Navigation Tests

``npm run login:nav``


#### Run Specific Tests

If you need to run a specific test file, you can specify it directly in the command:

``npx wdio run <path-to-test-file>``

## Reporting

#### Allure Reports

Test results are integrated with Allure for detailed reporting. Reports can be generated and opened using the following npm script:

#### Generate Allure Report

``npm run allure:generate``

#### Open Allure Report

``npm run allure:open``

#### Generate and Open Allure Report

``allure:gen:open``

This command will generate the Allure report from the results stored in webdriverIO/allure-results and open it in the browser.

## Page Object Model

The Page Object Model (POM) pattern is used to manage the locators and actions related to different pages of the application. Each page class encapsulates the interaction logic and validation methods.


License
This project is licensed under the MIT License - see the LICENSE file for details.
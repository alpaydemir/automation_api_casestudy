# API Test Automation Case Study

This repository contains an API test automation case study built with **Playwright and TypeScript**, enhanced with **PostgreSQL integration using Testcontainers** to persist API request and response data during test execution.

The purpose of this project is to demonstrate a realistic, production-like API testing setup including containerized dependencies, configuration management, and automated database logging.

---

## Tech Stack

- Node.js
- Playwright (API testing)
- TypeScript
- PostgreSQL
- Testcontainers
- Docker

---

## Project Structure

├── config
│ └── db.properties
├── src
│ ├── core
│ │ └── apiClient.ts
│ ├── db
│ │ ├── db.ts
│ │ ├── migrations.ts
│ │ ├── apiLogRepo.ts
│ │ └── postgresContainer.ts
│ ├── testSetup
│ │ ├── global-setup.ts
│ │ └── global-teardown.ts
│ └── tests
│ ├── auth.spec.ts
│ └── user.spec.ts
├── playwright.config.ts
├── package.json
└── README.md


---

## Architecture Overview

Tests
↓
ApiClient
↓
Playwright APIRequestContext
↓
PostgreSQL (Testcontainers)



- All API calls are executed through a centralized `ApiClient`
- Requests and responses are automatically logged into PostgreSQL
- PostgreSQL is provisioned dynamically using Testcontainers
- Database schema and tables are created automatically if they do not exist

---

## PostgreSQL & Testcontainers

- PostgreSQL is started automatically before test execution
- No external database setup is required
- Containers are stopped and cleaned up after tests
- Suitable for both local development and CI pipelines

---

## Configuration

Database configuration is read from a property file and can be overridden using environment variables.

config/db.properties

DB_HOST=localhost  
DB_PORT=5432  
DB_NAME=api_tests  
DB_USER=postgres  
DB_PASSWORD=postgres  
USE_TESTCONTAINERS=true  
DB_SCHEMA=public  

Environment variable overrides supported:

DB_HOST  
DB_PORT  
DB_NAME  
DB_USER  
DB_PASSWORD  

---

## Running the Tests

Prerequisites:

- Node.js  
- Docker (Docker Desktop)  

Install dependencies:

	- npm install  

Run API tests:

	- npx playwright test  
	
## Test Execution by Groups


Smoke Tests: Focus on critical API flows.

	- npx playwright test --grep @smoke

Regression Tests: Covers the full test suite.

	- npx playwright test --grep @regression
	
### View Test Report

	- npx playwright show-report

---

## API Request and Response Logging

Each API request executed during test runs is persisted into PostgreSQL with the following information:

- Test name  
- HTTP method  
- Request URL  
- Request body  
- Response body  
- HTTP status code  
- Timestamp  

Example verification query (run inside PostgreSQL):

SELECT test_name, method, url, status_code, created_at  
FROM api_logs  
ORDER BY id DESC  
LIMIT 20;  

---

## Key Features

- Centralized API client abstraction  
- Dynamic PostgreSQL provisioning using Testcontainers  
- Automatic schema and table creation  
- Environment-aware configuration  
- Clean setup and teardown lifecycle  
- Persistent API request and response logging  


## Design Patterns & Principles

This project adheres to high coding standards and avoids code duplication by implementing the following patterns:
	- Singleton Pattern: Applied to the ApiClient and Database connection instances. This ensures a single, global entry point for API interactions and database logging, preventing redundant connection overhead.

	- Factory/Builder Pattern: Used to dynamically generate test data and construct complex request payloads. This abstraction allows us to create various user scenarios (positive/negative) without repeating code.

	- Boilerplate Abstraction (Base Client): Common HTTP logic (headers, authentication, error handling) is encapsulated within a central apiClient.ts, ensuring that individual test files remain clean and focused on business logic.

	- Repository Pattern: The apiLogRepo.ts separates the database logic from the test execution flow, making the data persistence layer modular and easy to maintain.

---

## Notes

- This repository is implemented as a case study and not intended as a production system  
- Database logging is optional and does not affect test execution results  
- The project demonstrates real-world API test automation practices  

---

## Author

Mehmet Alp Aydemir
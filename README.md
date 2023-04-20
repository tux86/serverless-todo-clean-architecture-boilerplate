# AWS Serverless Todo API (Clean Architecture)

This repository contains a Todo API built using the Serverless Framework and Clean Architecture principles. It uses AWS Lambda, API Gateway, DynamoDB, and Cognito to create a serverless architecture for managing Todo items.

## Features

- Create, retrieve, update, and delete Todo items
- User authentication and authorization using AWS Cognito
- TypeScript support for better type safety and maintainability
- Clean Architecture principles for better separation of concerns and extensibility
- Logging using a custom Logger utility
- Request validation using class-validator

## Prerequisites

- Node.js 18.x
- NPM
- AWS CLI (configured with your AWS account credentials)
- Serverless Framework

## Installation

1. Clone the repository:

```
git clone https://github.com/tux86/aws-serverless-todo-api-clean-architecture.git
```

2. Install the dependencies:
```
cd aws-serverless-todo-api-clean-architecture
npm install
```


## Deployment

1. Configure the `serverless.ts` file with the appropriate AWS region, stage, and other settings.

2. Deploy the application:
```
serverless deploy
```

The Serverless Framework will package and deploy the application to your AWS account. After the deployment is complete, the API endpoints will be displayed in the terminal.

## Usage

You can interact with the Todo API using any HTTP client, such as `curl`, Postman, or a web application.

- Register a new user and authenticate with AWS Cognito to get an access token.
- Include the access token in the `Authorization` header of your API requests.

### Endpoints

- `POST /todos`: Create a new Todo item
- `GET /todos`: Retrieve all Todo items for the authenticated user
- `GET /todos/{id}`: Retrieve a specific Todo item by ID
- `PUT /todos/{id}`: Update a Todo item
- `DELETE /todos/{id}`: Delete a Todo item

## Development

During development, you can run the application locally using the Serverless Framework:


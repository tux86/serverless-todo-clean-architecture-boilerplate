# AWS Serverless Todo API with Clean Architecture

This project is a Todo App API built with Serverless Framework, TypeScript, and Clean Architecture. It is designed to
run on AWS Lambda and uses Amazon DynamoDB as the database and Amazon Cognito for user authentication and authorization.

## Features

- Serverless Framework with AWS Lambda functions
- TypeScript for strong typing and better code maintainability
- Clean Architecture for separation of concerns and improved testability
- Amazon DynamoDB for storing todos and user data
- Amazon Cognito for user authentication and authorization
- Unit and integration testing support (not yet implemented)

## Getting Started

1. Clone the repository:

```
git clone https://github.com/yourusername/aws-serverless-todo-api-clean-architecture.git
cd aws-serverless-todo-api-clean-architecture
```

2. Install dependencies:

```
yarn install
```

3. Configure your AWS credentials, following
   the [Serverless Framework guide](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/).

4. Deploy the application to AWS:

```
yarn deploy
```

5. To remove the application from AWS, run:

```
yarn remove
```

## Available Scripts

- `yarn deploy`: Deploy the application to AWS.
- `yarn remove`: Remove the application from AWS.
- `yarn start`: Start the application locally using serverless-offline.
- `yarn test`: Run tests (not yet implemented).
- `yarn lint`: Lint the code with ESLint.
- `yarn lint:fix`: Lint and automatically fix issues with ESLint.
- `yarn prettier`: Format the code with Prettier.

## Directory Structure

This project follows the Clean Architecture principles and has the following directory structure:

- `src/`
    - `application/`: Application layer, containing use cases, validators, and DTOs.
    - `domain/`: Domain layer, containing domain models, services, and repositories.
    - `infrastructure/`: Infrastructure layer, containing adapters, AWS Lambda functions, configuration, entities,
      helpers, IAC, implementation, and providers.
    - `main/`: The main layer serves as the assembly point for the entire system. it contains most of the factories and
      is interdependent with all other layers in the system.
    - `presentation/`: Presentation layer, containing controllers, interceptors, mappers, and HTTP-related protocols.

## Contributing

Feel free to submit issues, fork the repository and send pull requests. To run the linters and formatters before
submitting your changes, use:

```
yarn lint:fix && yarn prettier
```

## License

This project is licensed under the MIT License.

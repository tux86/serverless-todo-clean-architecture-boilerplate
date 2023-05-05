# ☁️ Serverless Todo API (AWS, Clean Architecture, Monorepo)

This project is a serverless Todo API built on AWS using Clean Architecture principles and a monorepo structure. It
leverages the Serverless Framework with TypeScript and esbuild for fast build times. Additionally, this project uses
pnpm workspaces for efficient package management.

## Key Features

- AWS Lambda for serverless functions
- AWS API Gateway for API management
- AWS DynamoDB as the NoSQL database
- AWS Cognito for user authentication and authorization
- Serverless Framework and serverless compose to manage and deploy the infrastructure
- TypeScript for type safety and better code maintainability
- Clean Architecture for separation of concerns and modularity
- pnpm workspaces for efficient package management
- esbuild for fast builds and bundling

# Directory structure

This folder contains various directories related to the project. For more information about each directory, please refer to their respective README files:

- [`/api`](./api/README.md): Contains the API (backend) implementation.
      - [`/api/infra`](./api/iac/README.md): Contains the Infrastructure as Code (IaC) configuration for the API (only stateless resources).
      - [`/api/src`](./api/src/README.md): Contains the source code for the API implementation.
        - [`/api/src/application`](./api/src/application/README.md): Contains the application layer of the API.
        - [`/api/src/domain`](./api/src/domain/README.md): Contains the domain layer of the API.
        - [`/api/src/infrastructure`](./api/src/infrastructure/README.md): Contains the infrastructure layer of the API.
        - [`/api/src/main`](./api/src/main/README.md): Contains the main entry points for the application.
        - [`/api/src/presentation`](./api/src/presentation/README.md): Contains the presentation layer of the API.

- [`/common`](./common/README.md): Contains shared utilities and code.

- [`/infra`](./infra/README.md): Contains the Infrastructure as Code (IaC) configuration for the project's stateful resources.


## Setup and Deployment

1. Install dependencies:

```sh
pnpm run install
```

2. create .env file (dev stage):

```sh
cp infra/.env.example infra/.env.dev
```

3. Deploy the infrastructure:

```sh
pnpm run deploy
```

## Start the local development environment:

```sh
pnpm run start
```

This will launch the Serverless Offline plugin and enable you to test your API locally.

## Remove Deployed Resources

```sh
pnpm run remove
```

## Wrapping Up

This Serverless TODO API project is an example of how to leverage the AWS ecosystem and clean architecture
principles to build a robust, maintainable, and scalable application. By following the instructions in this README, you
can successfully set up, deploy, and manage the API using the Serverless Framework, TypeScript, and other modern tools.

If you have any questions, suggestions, or issues, please feel free to open an issue or submit a pull request. Your
feedback is always welcome and appreciated!

Happy coding!

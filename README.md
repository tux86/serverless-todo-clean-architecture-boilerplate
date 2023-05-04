# Serverless Todo API (AWS, Clean Architecture, Monorepo)

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

# Infra Directory

This folder contains the Infrastructure as Code (IaC) configuration for the project's stateful resources, such as databases and authentication services (e.g., AWS Cognito).

## Structure

The Infra Directory is organized into the following sub-folders:

- `provider`: Contains provider-specific settings and configurations.
- `resources`: Contains resource definitions for stateful services, such as AWS Cognito User Pools and DynamoDB tables.
- `serverless.ts`: The main serverless configuration file for stateful resources.

## Usage

The Infra Directory is responsible for:

1. Defining and managing the stateful infrastructure resources for the project.
2. Configuring provider settings and options for stateful resources.
3. Ensuring that the serverless configuration for stateful resources is up-to-date and accurate.

## Best Practices

When working with the Infra Directory, follow these best practices:

1. Keep resource definitions for stateful services organized and modular by placing them in separate files within the `resources` folder.
2. Use the serverless framework for managing stateful infrastructure resources and deployments.
3. Follow best practices for Infrastructure as Code, such as keeping configurations version-controlled and documenting changes.

## Contributing

When adding new stateful infrastructure resources or updating existing ones, ensure that you:

1. Follow the existing project structure and organization.
2. Update this README.md file if needed.
3. Test your changes thoroughly before deploying them to production.
4. Adhere to the project's coding style and best practices.

# API/IaC Directory

This folder contains the Infrastructure as Code (IaC) configuration for the API (backend)'s stateless resources, primarily AWS Lambda functions, API Gateway, and IAM roles. The `/infra` folder is responsible for stateful resources like databases, authentication services, and other persistent resources.

One of the advantages of managing stateless resources in this directory is that if they are accidentally removed or modified, the data stored in stateful resources (e.g., databases) will not be lost.

## Structure

The API/IaC Directory is organized into the following sub-folders:

- `serverless`: Contains the serverless configuration files for various components, such as functions, IAM roles, and provider settings.
- `serverless/functions`: Contains the configuration for AWS Lambda functions, including the API Gateway event triggers and associated handlers.
- `serverless/helpers.ts`: Utility functions and shared code used across serverless configurations.
- `serverless/iam`: Contains IAM role configurations for the API (backend).
- `serverless/provider`: Contains provider-specific settings and configurations, such as tags.

## Usage

The API/IaC Directory is responsible for:

1. Defining and managing stateless infrastructure resources for the API (backend).
2. Configuring provider settings and options for stateless resources.
3. Ensuring that the serverless configuration for stateless resources is up-to-date and accurate.

## Best Practices

When working with the API/IaC Directory, follow these best practices:

1. Keep resource definitions for stateless services organized and modular by placing them in separate files within the `serverless` folder.
2. Use the serverless framework for managing stateless infrastructure resources and deployments.
3. Follow best practices for Infrastructure as Code, such as keeping configurations version-controlled and documenting changes.

## Contributing

When adding new stateless infrastructure resources or updating existing ones, ensure that you:

1. Follow the existing project structure and organization.
2. Update this README.md file if needed.
3. Test your changes thoroughly before deploying them to production.
4. Adhere to the project's coding style and best practices.

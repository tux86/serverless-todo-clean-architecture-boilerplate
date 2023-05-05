# /api/src

The `/api/src` directory contains the source code for the API (backend) of the project. This directory is organized into several sub-directories, each with its specific purpose:

- `application`: Contains the application layer of the API, including use cases, validators, DTOs, mappers, and utility functions. It is responsible for processing the input, executing business logic, and generating responses.

- `domain`: Contains the domain layer of the API, including domain models, repositories, and services. This layer represents the core business logic and rules of the application.

- `infrastructure`: Contains the infrastructure layer of the API, which includes adapters, configuration files, entities, handlers, mappers, providers, and repositories. This layer is responsible for implementing and connecting the domain layer to external services and resources, such as databases and AWS services.

- `main`: Contains the factories and dependency injection configuration for the API. This layer is responsible for initializing and managing the instances of various components, such as controllers, repositories, and services.

- `presentation`: Contains the presentation layer of the API, which includes controllers, interceptors, and response objects. This layer is responsible for handling incoming HTTP requests, invoking the appropriate use cases, and returning HTTP responses.

Each sub-directory contains a README.md file with more details about its contents and purpose.

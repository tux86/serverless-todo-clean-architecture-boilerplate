import { Container } from 'inversify'

import { CreateTodoUseCase } from '@/application/usecases/todo/create-todo.use-case'
import { DeleteTodoUseCase } from '@/application/usecases/todo/delete-todo.use-case'
import { GetTodoUseCase } from '@/application/usecases/todo/get-todo.use-case.'
import { ListTodosUseCase } from '@/application/usecases/todo/list-todos.use-case'
import { UpdateTodoUseCase } from '@/application/usecases/todo/update-todo.use-case'
import { AuthenticateUserUseCase } from '@/application/usecases/user/authenticate-user.use-case'
import { DeleteUserUseCase } from '@/application/usecases/user/delete-user.use-case'
import { GetUserUseCase } from '@/application/usecases/user/get-user.use-case'
import { RegisterUserUseCase } from '@/application/usecases/user/register-user.use-case'
import { BaseValidator } from '@/application/validators/abstract/base.validator'
import { TodoValidator } from '@/application/validators/todo.validator'
import { UserValidator } from '@/application/validators/user.validator'
import { logDependencyMiddleware } from '@/common/ioc/log-dependency-middleware'
import { DynamodbClientProvider } from '@/infrastructure/providers/dynamodb.provider'
import { DynamodbTodoRepository } from '@/infrastructure/repositories/dynamodb.todo.repository'
import { DynamodbUserRepository } from '@/infrastructure/repositories/dynamodb.user.repository'
import { AuthServiceImpl } from '@/infrastructure/services/auth-service.impl'
import { CognitoUserService } from '@/infrastructure/services/cognito-user.service'
import { CreateTodoController } from '@/presentation/controllers/todo/create-todo.controller'
import { DeleteTodoController } from '@/presentation/controllers/todo/delete-todo.controller'
import { GetTodoController } from '@/presentation/controllers/todo/get-todo.controller'
import { ListTodosController } from '@/presentation/controllers/todo/list-todos.controller'
import { UpdateTodoController } from '@/presentation/controllers/todo/update-todo.controller'
import { AuthenticateUserController } from '@/presentation/controllers/user/authenticate-user.controller'
import { DeleteUserController } from '@/presentation/controllers/user/delete-user.controller'
import { GetUserController } from '@/presentation/controllers/user/get-user.controller'
import { RegisterUserController } from '@/presentation/controllers/user/register-user.controller'

export class DIContainer extends Container {
  private static instance: DIContainer | null = null

  constructor() {
    super()
    this.applyMiddleware(logDependencyMiddleware)
    this.bindDependencies()
  }

  public static getInstance(): DIContainer {
    if (!this.instance) {
      this.instance = new DIContainer()
    }
    return this.instance
  }

  private bindDependencies(): void {
    // Controllers
    this.bind(CreateTodoController).to(CreateTodoController)
    this.bind(DeleteTodoController).to(DeleteTodoController)
    this.bind(GetTodoController).to(GetTodoController)
    this.bind(ListTodosController).to(ListTodosController)
    this.bind(UpdateTodoController).to(UpdateTodoController)
    this.bind(AuthenticateUserController).to(AuthenticateUserController)
    this.bind(DeleteUserController).to(DeleteUserController)
    this.bind(GetUserController).to(GetUserController)
    this.bind(RegisterUserController).to(RegisterUserController)

    // Use-cases
    this.bind(CreateTodoUseCase).to(CreateTodoUseCase)
    this.bind(DeleteTodoUseCase).to(DeleteTodoUseCase)
    this.bind(GetTodoUseCase).to(GetTodoUseCase)
    this.bind(ListTodosUseCase).to(ListTodosUseCase)
    this.bind(UpdateTodoUseCase).to(UpdateTodoUseCase)
    this.bind(AuthenticateUserUseCase).to(AuthenticateUserUseCase)
    this.bind(DeleteUserUseCase).to(DeleteUserUseCase)
    this.bind(GetUserUseCase).to(GetUserUseCase)
    this.bind(RegisterUserUseCase).to(RegisterUserUseCase)

    // Validators
    this.bind(BaseValidator).to(BaseValidator)
    this.bind(TodoValidator).to(TodoValidator)
    this.bind(UserValidator).to(UserValidator)

    // Services
    this.bind(AuthServiceImpl).to(AuthServiceImpl)
    this.bind(CognitoUserService).to(CognitoUserService)

    // Repositories
    this.bind(DynamodbTodoRepository).to(DynamodbTodoRepository)
    this.bind(DynamodbUserRepository).to(DynamodbUserRepository)

    // providers
    this.bind(DynamodbClientProvider).to(DynamodbClientProvider)
  }
}

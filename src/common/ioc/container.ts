import { Container } from 'inversify'

import { CreateTodo } from '@/application/usecases/todo/create-todo'
import { DeleteTodo } from '@/application/usecases/todo/delete-todo'
import { GetTodo } from '@/application/usecases/todo/get-todo'
import { ListTodos } from '@/application/usecases/todo/list-todos'
import { UpdateTodo } from '@/application/usecases/todo/update-todo'
import { AuthenticateUser } from '@/application/usecases/user/authenticate-user'
import { DeleteUser } from '@/application/usecases/user/delete-user'
import { GetUser } from '@/application/usecases/user/get-user'
import { RegisterUser } from '@/application/usecases/user/register-user'
import { TodoValidator } from '@/application/validators/todo.validator'
import { UserValidator } from '@/application/validators/user.validator'
import { TYPES } from '@/common/ioc/types'
import { DynamodbClientProvider } from '@/infrastructure/aws/providers/dynamodb.provider'
import { TodoDynamodbRepository } from '@/infrastructure/aws/repositories/todo.dynamodb.repository'
import { UserDynamodbRepository } from '@/infrastructure/aws/repositories/user.dynamodb.repository'
import { AuthServiceImpl } from '@/infrastructure/aws/services/auth-service.impl'
import { UserCognitoService } from '@/infrastructure/aws/services/user.cognito.service'
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
  constructor() {
    super()
    this.bindDependencies()
  }

  private bindDependencies(): void {
    // Controllers
    this.bind(TYPES.CreateTodoController).to(CreateTodoController)
    this.bind(TYPES.DeleteTodoController).to(DeleteTodoController)
    this.bind(TYPES.GetTodoController).to(GetTodoController)
    this.bind(TYPES.ListTodosController).to(ListTodosController)
    this.bind(TYPES.UpdateTodoController).to(UpdateTodoController)
    this.bind(TYPES.AuthenticateUserController).to(AuthenticateUserController)
    this.bind(TYPES.DeleteUserController).to(DeleteUserController)
    this.bind(TYPES.GetUserController).to(GetUserController)
    this.bind(TYPES.RegisterUserController).to(RegisterUserController)

    // Use-cases
    this.bind(TYPES.CreateTodo).to(CreateTodo)
    this.bind(TYPES.DeleteTodo).to(DeleteTodo)
    this.bind(TYPES.GetTodo).to(GetTodo)
    this.bind(TYPES.ListTodos).to(ListTodos)
    this.bind(TYPES.UpdateTodo).to(UpdateTodo)
    this.bind(TYPES.AuthenticateUser).to(AuthenticateUser)
    this.bind(TYPES.DeleteUser).to(DeleteUser)
    this.bind(TYPES.GetUser).to(GetUser)
    this.bind(TYPES.RegisterUser).to(RegisterUser)

    // Validators
    this.bind(TYPES.TodoValidator).to(TodoValidator)
    this.bind(TYPES.UserValidator).to(UserValidator)

    // Services
    this.bind(TYPES.AuthServiceImpl).to(AuthServiceImpl)
    this.bind(TYPES.UserCognitoService).to(UserCognitoService)

    // Repositories
    this.bind(TYPES.TodoDynamodbRepository).to(TodoDynamodbRepository)
    this.bind(TYPES.UserDynamodbRepository).to(UserDynamodbRepository)

    // providers
    this.bind(TYPES.DynamodbClientProvider).to(DynamodbClientProvider)
  }
}

export const container = new DIContainer()

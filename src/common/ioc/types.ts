export const TYPES = {
  // Controllers
  CreateTodoController: Symbol.for('CreateTodoController'),
  DeleteTodoController: Symbol.for('DeleteTodoController'),
  GetTodoController: Symbol.for('GetTodoController'),
  ListTodosController: Symbol.for('ListTodosController'),
  UpdateTodoController: Symbol.for('UpdateTodoController'),
  AuthenticateUserController: Symbol.for('AuthenticateUserController'),
  DeleteUserController: Symbol.for('DeleteUserController'),
  GetUserController: Symbol.for('GetUserController'),
  RegisterUserController: Symbol.for('RegisterUserController'),

  // Use-cases
  CreateTodoUseCase: Symbol.for('CreateTodoUseCase'),
  DeleteTodoUseCase: Symbol.for('DeleteTodoUseCase'),
  GetTodoUseCase: Symbol.for('GetTodoUseCase'),
  ListTodosUseCase: Symbol.for('ListTodosUseCase'),
  UpdateTodoUseCase: Symbol.for('UpdateTodoUseCase'),
  AuthenticateUserUseCase: Symbol.for('AuthenticateUserUseCase'),
  DeleteUserUseCase: Symbol.for('DeleteUserUseCase'),
  GetUserUseCase: Symbol.for('GetUserUseCase'),
  RegisterUserUseCase: Symbol.for('RegisterUserUseCase'),

  // Validators
  BaseValidator: Symbol.for('BaseValidator'),
  TodoValidator: Symbol.for('TodoValidator'),
  UserValidator: Symbol.for('UserValidator'),

  // Services
  AuthService: Symbol.for('AuthService'),
  UserService: Symbol.for('UserService'),
  CognitoUserService: Symbol.for('CognitoUserService'),

  // Repositories
  TodoRepository: Symbol.for('TodoRepository'),
  UserRepository: Symbol.for('UserRepository'),

  // Providers
  DynamodbClientProvider: Symbol.for('DynamodbClientProvider')
}

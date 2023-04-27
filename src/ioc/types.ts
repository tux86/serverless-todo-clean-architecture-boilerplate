export const TYPES = {
  // controllers
  CreateTodoController: Symbol.for('CreateTodoController'),
  DeleteTodoController: Symbol.for('DeleteTodoController'),
  GetTodoController: Symbol.for('GetTodoController'),
  ListTodosController: Symbol.for('ListTodosController'),
  UpdateTodoController: Symbol.for('UpdateTodoController'),
  AuthenticateUserController: Symbol.for('AuthenticateUserController'),
  DeleteUserController: Symbol.for('DeleteUserController'),
  GetUserController: Symbol.for('GetUserController'),
  RegisterUserController: Symbol.for('RegisterUserController'),

  // use-cases
  CreateTodo: Symbol.for('CreateTodo'),
  DeleteTodo: Symbol.for('DeleteTodo'),
  GetTodo: Symbol.for('GetTodo'),
  ListTodos: Symbol.for('ListTodos'),
  UpdateTodo: Symbol.for('UpdateTodo'),
  AuthenticateUser: Symbol.for('AuthenticateUser'),
  DeleteUser: Symbol.for('DeleteUser'),
  GetUser: Symbol.for('GetUser'),
  RegisterUser: Symbol.for('RegisterUser'),

  // validators
  TodoValidator: Symbol.for('TodoValidator'),
  UserValidator: Symbol.for('UserValidator'),

  // services
  AuthServiceImpl: Symbol.for('AuthServiceImpl'),
  UserCognitoService: Symbol.for('UserCognitoService'),
  UserSecurityServiceImpl: Symbol.for('UserSecurityServiceImpl'),

  // repositories
  TodoDynamodbRepository: Symbol.for('TodoDynamodbRepository'),
  UserDynamodbRepository: Symbol.for('UserDynamodbRepository'),

  // providers
  DynamodbClientProvider: Symbol.for('DynamodbClientProvider')
}

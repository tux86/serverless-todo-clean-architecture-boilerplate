import { CreateTodo } from '@/application/usecases/todo/create-todo'
import { DeleteTodo } from '@/application/usecases/todo/delete-todo'
import { GetTodo } from '@/application/usecases/todo/get-todo'
import { ListTodos } from '@/application/usecases/todo/list-todos'
import { UpdateTodo } from '@/application/usecases/todo/update-todo'
import { TodoValidator } from '@/application/validators/todo.validator'
import { createApiGatewayHandler } from '@/infrastructure/aws/api-gw/libs/aws-handler-adapter'
import { dynamodbConfig } from '@/infrastructure/aws/dynamodb/config'
import { TodoDynamodbRepository } from '@/infrastructure/repositories/todo.dynamodb.repository'
import { CreateTodoController } from '@/presentation/controllers/todo/create-todo.controller'
import { DeleteTodoController } from '@/presentation/controllers/todo/delete-todo.controller'
import { GetTodoController } from '@/presentation/controllers/todo/get-todo.controller'
import { ListTodoController } from '@/presentation/controllers/todo/list-todos.controller'
import { UpdateTodoController } from '@/presentation/controllers/todo/update-todo.controller'

const todoDynamodbRepository = new TodoDynamodbRepository(dynamodbConfig.tables.todosTable)
const createTodoUseCase = new CreateTodo(todoDynamodbRepository, new TodoValidator())
const updateTodoUseCase = new UpdateTodo(todoDynamodbRepository, new TodoValidator())
const getTodoUseCase = new GetTodo(todoDynamodbRepository)
const listTodosUseCase = new ListTodos(todoDynamodbRepository)
const deleteTodoUseCase = new DeleteTodo(todoDynamodbRepository)

const createTodoController = new CreateTodoController(createTodoUseCase)
const updateTodoController = new UpdateTodoController(updateTodoUseCase)
const getTodoController = new GetTodoController(getTodoUseCase)
const listTodoController = new ListTodoController(listTodosUseCase)
const deleteTodoController = new DeleteTodoController(deleteTodoUseCase)

export const createTodo = createApiGatewayHandler(createTodoController)
export const updateTodo = createApiGatewayHandler(updateTodoController)
export const getTodo = createApiGatewayHandler(getTodoController)
export const listTodos = createApiGatewayHandler(listTodoController)
export const deleteTodo = createApiGatewayHandler(deleteTodoController)

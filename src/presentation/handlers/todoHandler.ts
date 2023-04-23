import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { CreateTodoInput } from '@/application/dtos/todo/CreateTodoInput'
import { UpdateTodoInput } from '@/application/dtos/todo/UpdateTodoInput'
import { CreateTodoUseCase } from '@/application/usecases/todo/CreateTodoUseCase'
import { DeleteTodoUseCase } from '@/application/usecases/todo/DeleteTodoUseCase'
import { GetTodoUseCase } from '@/application/usecases/todo/GetTodoUseCase'
import { ListTodosUseCase } from '@/application/usecases/todo/ListTodosUseCase'
import { UpdateTodoUseCase } from '@/application/usecases/todo/UpdateTodoUseCase'
import { TodoValidator } from '@/application/validators/TodoValidator'
import { uuidV4 } from '@/domain/utils/uuidGenerator'
import { Config } from '@/infra/Config'
import { TodoRepositoryImpl } from '@/infra/repositories/TodoRepositoryImpl'
import { parseApiGwRequestBody, toApiGwResponse } from '@/presentation/utils/apiGateway'
import { apiGatewayHandler } from '@/presentation/utils/apiGatewayHandler'
import { HttpStatus } from '@/presentation/utils/HttpStatus'

// Initialize user services, repositories, and use cases for management.
const { todosTable } = Config.getInstance().dynamodb.tables
const todoRepository = new TodoRepositoryImpl(todosTable)
const getTodoUseCase = new GetTodoUseCase(todoRepository)
const listTodosUseCase = new ListTodosUseCase(todoRepository)
const createTodoUseCase = new CreateTodoUseCase(todoRepository, new TodoValidator())
const updateTodoUseCase = new UpdateTodoUseCase(todoRepository, new TodoValidator())
const deleteTodoUseCase = new DeleteTodoUseCase(todoRepository)

const createTodoHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const input = parseApiGwRequestBody<CreateTodoInput>(event.body)
  input.userId = uuidV4() // TODO: get real user id from token
  const createdTodo = await createTodoUseCase.execute(input)
  return toApiGwResponse(HttpStatus.CREATED, createdTodo)
}

const getTodoHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { todoId } = event.pathParameters
  const todo = await getTodoUseCase.execute(todoId)
  return toApiGwResponse(HttpStatus.OK, todo)
}

const listTodosHandler = async (): Promise<APIGatewayProxyResult> => {
  const todos = await listTodosUseCase.execute()
  return toApiGwResponse(HttpStatus.OK, todos)
}

const updateTodoHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { todoId } = event.pathParameters
  const input = parseApiGwRequestBody<UpdateTodoInput>(event.body)
  input.todoId = todoId
  const updatedTodo = await updateTodoUseCase.execute(input)
  return toApiGwResponse(HttpStatus.OK, updatedTodo)
}

const deleteTodoHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { todoId } = event.pathParameters
  await deleteTodoUseCase.execute(todoId)
  return toApiGwResponse(HttpStatus.NO_CONTENT)
}

export const createTodo = apiGatewayHandler(createTodoHandler)
export const updateTodo = apiGatewayHandler(updateTodoHandler)
export const getTodo = apiGatewayHandler(getTodoHandler)
export const listTodos = apiGatewayHandler(listTodosHandler)
export const deleteTodo = apiGatewayHandler(deleteTodoHandler)

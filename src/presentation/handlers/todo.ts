import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { v4 as uuidv4 } from 'uuid'

import { CreateTodoUseCase } from '@/application/usecases/todo/CreateTodoUseCase'
import { DeleteTodoUseCase } from '@/application/usecases/todo/DeleteTodoUseCase'
import { GetTodoUseCase } from '@/application/usecases/todo/GetTodoUseCase'
import { ListTodosUseCase } from '@/application/usecases/todo/ListTodosUseCase'
import { UpdateTodoUseCase } from '@/application/usecases/todo/UpdateTodoUseCase'
import { TodoValidator } from '@/application/validators/TodoValidator'
import { Config } from '@/infra/Config'
import { TodoRepositoryImpl } from '@/infra/repositories/TodoRepositoryImpl'
import { withErrorHandling } from '@/presentation/middlewares/errorHandling'
import { parseBody, response } from '@/presentation/utils/apigw'
import { HttpStatus } from '@/presentation/utils/HttpStatus'

const tableName = Config.getInstance().todosTable
const todoRepository = new TodoRepositoryImpl(tableName)
const getTodoUseCase = new GetTodoUseCase(todoRepository)
const listTodosUseCase = new ListTodosUseCase(todoRepository)
const createTodoUseCase = new CreateTodoUseCase(todoRepository, new TodoValidator())
const updateTodoUseCase = new UpdateTodoUseCase(todoRepository, new TodoValidator())
const deleteTodoUseCase = new DeleteTodoUseCase(todoRepository)

const createTodoHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoData = parseBody(event.body) as any // TODO: fix this
  const userId = uuidv4()

  const createdTodo = await createTodoUseCase.execute({ ...todoData, userId })

  return response(HttpStatus.CREATED, createdTodo)
}
export const createTodo = withErrorHandling(createTodoHandler)

// READ
const getTodoHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { todoId } = event.pathParameters

  const todo = await getTodoUseCase.execute(todoId)

  return response(HttpStatus.OK, todo)
}
export const getTodo = withErrorHandling(getTodoHandler)

const listTodosHandler = async (): Promise<APIGatewayProxyResult> => {
  const todos = await listTodosUseCase.execute()

  return response(HttpStatus.OK, todos)
}
export const listTodos = withErrorHandling(listTodosHandler)

const updateTodoHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { todoId } = event.pathParameters
  const todoData = parseBody(event.body) as any // TODO: fix this

  const updatedTodo = await updateTodoUseCase.execute({ todoId, ...todoData })

  return response(HttpStatus.OK, updatedTodo)
}
export const updateTodo = withErrorHandling(updateTodoHandler)

const deleteTodoHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { todoId } = event.pathParameters

  await deleteTodoUseCase.execute(todoId)

  return response(HttpStatus.NO_CONTENT)
}
export const deleteTodo = withErrorHandling(deleteTodoHandler)

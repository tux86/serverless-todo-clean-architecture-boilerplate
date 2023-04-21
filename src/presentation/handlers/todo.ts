import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { CreateTodoUseCase } from '@/application/usecases/todo/CreateTodoUseCase'
import { TodoValidator } from '@/application/validators/TodoValidator'
import { TodoRepositoryImpl } from '@/infra/aws/dynamodb/TodoRepositoryImpl'
import { Config } from '@/infra/Config'

import { TodoController } from '../controllers/TodoController'

const config = new Config()
const todoRepository = new TodoRepositoryImpl(config)
const createTodo = new CreateTodoUseCase(todoRepository)
const todoValidator = new TodoValidator()
const todoController = new TodoController(createTodo, todoValidator)
export const create = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return await todoController.create(event)
}

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { CreateTodo } from '@/application/use-cases/todo/CreateTodo'
import { TodoValidator } from '@/application/validators/TodoValidator'
import { TodoRepositoryImpl } from '@/infrastructure/aws/dynamodb/TodoRepositoryImpl'

import { TodoController } from '../controllers/TodoController'

const todoRepository = new TodoRepositoryImpl()
const createTodo = new CreateTodo(todoRepository)
const todoValidator = new TodoValidator()
const todoController = new TodoController(createTodo, todoValidator)
export const create = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return await todoController.create(event)
}

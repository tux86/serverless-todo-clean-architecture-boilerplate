import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { v4 as uuidv4 } from 'uuid'

import { CreateTodoUseCase } from '@/application/usecases/todo/CreateTodoUseCase'
import { TodoValidator } from '@/application/validators/TodoValidator'
import { HttpStatus } from '@/common/enums/HttpStatus'
import { Config } from '@/infra/Config'
import { TodoRepositoryImpl } from '@/infra/repositories/TodoRepositoryImpl'
import { logger } from '@/infra/utils/Logger'

const tableName = Config.getInstance().TodosTable
const todoRepository = new TodoRepositoryImpl(tableName)
const createTodoUseCase = new CreateTodoUseCase(todoRepository, new TodoValidator())

export const create = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const todoData = JSON.parse(event.body || '{}')

    // const userId = event.requestContext.authorizer?.claims.sub;
    const userId = uuidv4()

    const createdTodo = await createTodoUseCase.execute({ ...todoData, userId })

    return {
      statusCode: HttpStatus.CREATED,
      body: JSON.stringify(createdTodo)
    }
  } catch (error) {
    logger.error(error)
  }
}

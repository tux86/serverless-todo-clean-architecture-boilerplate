import { GetTodoUseCase } from '@/application/usecases/todo/get-todo.use-case.'
import { TodoValidator } from '@/application/validators/todo.validator'
import { DynamodbClientProvider } from '@/infrastructure/providers/dynamodb.provider'
import { DynamodbTodoRepository } from '@/infrastructure/repositories/dynamodb.todo.repository'
import { GetTodoController } from '@/presentation/controllers/todo/get-todo.controller'

export class GetTodoControllerFactory {
  public static getInstance(): GetTodoController {
    const dynamodbClientProvider = new DynamodbClientProvider()
    const todoRepository = new DynamodbTodoRepository(dynamodbClientProvider)
    const getTodoUseCase = new GetTodoUseCase(todoRepository, new TodoValidator())
    return new GetTodoController(getTodoUseCase)
  }
}

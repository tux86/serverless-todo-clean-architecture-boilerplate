import { UpdateTodoUseCase } from '@/application/usecases/todo/update-todo.use-case'
import { TodoValidator } from '@/application/validators/todo.validator'
import { DynamodbClientProvider } from '@/infrastructure/providers/dynamodb.provider'
import { DynamodbTodoRepository } from '@/infrastructure/repositories/dynamodb.todo.repository'
import { UpdateTodoController } from '@/presentation/controllers/todo/update-todo.controller'

export class UpdateTodoControllerFactory {
  public static getInstance(): UpdateTodoController {
    const dynamodbClientProvider = new DynamodbClientProvider()
    const todoRepository = new DynamodbTodoRepository(dynamodbClientProvider)
    const updateTodoUseCase = new UpdateTodoUseCase(todoRepository, new TodoValidator())
    return new UpdateTodoController(updateTodoUseCase)
  }
}

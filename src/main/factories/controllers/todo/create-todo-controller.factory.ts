import { CreateTodoUseCase } from '@/application/usecases/todo/create-todo.use-case'
import { TodoValidator } from '@/application/validators/todo.validator'
import { DynamodbClientProvider } from '@/infrastructure/providers/dynamodb.provider'
import { DynamodbTodoRepository } from '@/infrastructure/repositories/dynamodb.todo.repository'
import { CreateTodoController } from '@/presentation/controllers/todo/create-todo.controller'

export class CreateTodoControllerFactory {
  public static getInstance(): CreateTodoController {
    const dynamodbClientProvider = new DynamodbClientProvider()
    const todoRepository = new DynamodbTodoRepository(dynamodbClientProvider)
    const createTodoUseCase = new CreateTodoUseCase(todoRepository, new TodoValidator())
    return new CreateTodoController(createTodoUseCase)
  }
}

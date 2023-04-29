import { DeleteTodoUseCase } from '@/application/usecases/todo/delete-todo.use-case'
import { TodoValidator } from '@/application/validators/todo.validator'
import { DynamodbClientProvider } from '@/infrastructure/providers/dynamodb.provider'
import { DynamodbTodoRepository } from '@/infrastructure/repositories/dynamodb.todo.repository'
import { DeleteTodoController } from '@/presentation/controllers/todo/delete-todo.controller'

export class DeleteTodoControllerFactory {
  public static getInstance(): DeleteTodoController {
    const dynamodbClientProvider = new DynamodbClientProvider()
    const todoRepository = new DynamodbTodoRepository(dynamodbClientProvider)
    const deleteTodoUseCase = new DeleteTodoUseCase(todoRepository, new TodoValidator())
    return new DeleteTodoController(deleteTodoUseCase)
  }
}

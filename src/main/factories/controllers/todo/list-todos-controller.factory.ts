import { ListTodosUseCase } from '@/application/usecases/todo/list-todos.use-case'
import { DynamodbClientProvider } from '@/infrastructure/providers/dynamodb.provider'
import { DynamodbTodoRepository } from '@/infrastructure/repositories/dynamodb.todo.repository'
import { ListTodosController } from '@/presentation/controllers/todo/list-todos.controller'

export class ListTodosControllerFactory {
  public static getInstance(): ListTodosController {
    const dynamodbClientProvider = new DynamodbClientProvider()
    const todoRepository = new DynamodbTodoRepository(dynamodbClientProvider)
    const listTodoUseCase = new ListTodosUseCase(todoRepository)
    return new ListTodosController(listTodoUseCase)
  }
}

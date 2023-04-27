import { CreateTodo } from '@/application/usecases/todo/create-todo'
import { DeleteTodo } from '@/application/usecases/todo/delete-todo'
import { GetTodo } from '@/application/usecases/todo/get-todo'
import { ListTodos } from '@/application/usecases/todo/list-todos'
import { UpdateTodo } from '@/application/usecases/todo/update-todo'
import { TodoValidator } from '@/application/validators/todo.validator'
import { dynamodbConfig } from '@/infrastructure/config/aws/dynamodb'
import { TodoDynamodbRepository } from '@/infrastructure/implementation/repositories/todo.dynamodb.repository'

export class TodoUseCasesFactory {
  static createTodoUseCase(): CreateTodo {
    const todoDynamodbRepository = new TodoDynamodbRepository(dynamodbConfig.tables.todosTable)
    return new CreateTodo(todoDynamodbRepository, new TodoValidator())
  }

  static updateTodoUseCase(): UpdateTodo {
    const todoDynamodbRepository = new TodoDynamodbRepository(dynamodbConfig.tables.todosTable)
    return new UpdateTodo(todoDynamodbRepository, new TodoValidator())
  }

  static getTodoUseCase(): GetTodo {
    const todoDynamodbRepository = new TodoDynamodbRepository(dynamodbConfig.tables.todosTable)
    return new GetTodo(todoDynamodbRepository)
  }

  static listTodosUseCase(): ListTodos {
    const todoDynamodbRepository = new TodoDynamodbRepository(dynamodbConfig.tables.todosTable)
    return new ListTodos(todoDynamodbRepository)
  }

  static deleteTodoUseCase(): DeleteTodo {
    const todoDynamodbRepository = new TodoDynamodbRepository(dynamodbConfig.tables.todosTable)
    return new DeleteTodo(todoDynamodbRepository)
  }
}

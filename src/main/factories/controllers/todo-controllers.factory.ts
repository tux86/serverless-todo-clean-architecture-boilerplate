import { TodoUseCasesFactory } from '@/main/factories/usecases/todo-usecases.factory'
import { CreateTodoController } from '@/presentation/controllers/todo/create-todo.controller'
import { DeleteTodoController } from '@/presentation/controllers/todo/delete-todo.controller'
import { GetTodoController } from '@/presentation/controllers/todo/get-todo.controller'
import { ListTodoController } from '@/presentation/controllers/todo/list-todos.controller'
import { UpdateTodoController } from '@/presentation/controllers/todo/update-todo.controller'

export class TodoControllersFactory {
  static createCreateTodoController(): CreateTodoController {
    return new CreateTodoController(TodoUseCasesFactory.createTodoUseCase())
  }

  static createUpdateTodoController(): UpdateTodoController {
    return new UpdateTodoController(TodoUseCasesFactory.updateTodoUseCase())
  }

  static createGetTodoController(): GetTodoController {
    return new GetTodoController(TodoUseCasesFactory.getTodoUseCase())
  }

  static createListTodoController(): ListTodoController {
    return new ListTodoController(TodoUseCasesFactory.listTodosUseCase())
  }

  static createDeleteTodoController(): DeleteTodoController {
    return new DeleteTodoController(TodoUseCasesFactory.deleteTodoUseCase())
  }
}

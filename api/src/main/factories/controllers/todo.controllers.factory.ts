import { CreateTodoUseCase } from '@/api/application/use-cases/todo/create-todo.use-case'
import { DeleteTodoUseCase } from '@/api/application/use-cases/todo/delete-todo.use-case'
import { GetTodoUseCase } from '@/api/application/use-cases/todo/get-todo.use-case.'
import { ListTodosUseCase } from '@/api/application/use-cases/todo/list-todos.use-case'
import { UpdateTodoUseCase } from '@/api/application/use-cases/todo/update-todo.use-case'
import { TodoValidator } from '@/api/application/validators/todo.validator'
import { CreateTodoController } from '@/api/presentation/controllers/todo/create-todo.controller'
import { DeleteTodoController } from '@/api/presentation/controllers/todo/delete-todo.controller'
import { GetTodoController } from '@/api/presentation/controllers/todo/get-todo.controller'
import { ListTodosController } from '@/api/presentation/controllers/todo/list-todos.controller'
import { UpdateTodoController } from '@/api/presentation/controllers/todo/update-todo.controller'

import { createTodoRepository } from '../repositories.factory'

export const createCreateTodoController = (): CreateTodoController => {
  const createTodoUseCase = new CreateTodoUseCase(createTodoRepository(), new TodoValidator())
  return new CreateTodoController(createTodoUseCase)
}

export const createListTodosController = (): ListTodosController => {
  const listTodoUseCase = new ListTodosUseCase(createTodoRepository())
  return new ListTodosController(listTodoUseCase)
}

export const createDeleteTodoController = (): DeleteTodoController => {
  const deleteTodoUseCase = new DeleteTodoUseCase(createTodoRepository(), new TodoValidator())
  return new DeleteTodoController(deleteTodoUseCase)
}

export const createGetTodoController = (): GetTodoController => {
  const getTodoUseCase = new GetTodoUseCase(createTodoRepository(), new TodoValidator())
  return new GetTodoController(getTodoUseCase)
}

export const createUpdateTodoController = (): UpdateTodoController => {
  const updateTodoUseCase = new UpdateTodoUseCase(createTodoRepository(), new TodoValidator())
  return new UpdateTodoController(updateTodoUseCase)
}

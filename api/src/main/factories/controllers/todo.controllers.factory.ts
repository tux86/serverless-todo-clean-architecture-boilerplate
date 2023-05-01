import { CreateTodoUseCase } from '@/api/application/usecases/todo/create-todo.use-case'
import { DeleteTodoUseCase } from '@/api/application/usecases/todo/delete-todo.use-case'
import { GetTodoUseCase } from '@/api/application/usecases/todo/get-todo.use-case.'
import { ListTodosUseCase } from '@/api/application/usecases/todo/list-todos.use-case'
import { UpdateTodoUseCase } from '@/api/application/usecases/todo/update-todo.use-case'
import { TodoValidator } from '@/api/application/validators/todo.validator'

import { CreateTodoController } from '../../../presentation/controllers/todo/create-todo.controller'
import { DeleteTodoController } from '../../../presentation/controllers/todo/delete-todo.controller'
import { GetTodoController } from '../../../presentation/controllers/todo/get-todo.controller'
import { ListTodosController } from '../../../presentation/controllers/todo/list-todos.controller'
import { UpdateTodoController } from '../../../presentation/controllers/todo/update-todo.controller'
import { createTodoRepository } from '../repositories.factory'

export const createCreateTodoController = () => {
  const createTodoUseCase = new CreateTodoUseCase(createTodoRepository(), new TodoValidator())
  return new CreateTodoController(createTodoUseCase)
}

export const createListTodosController = () => {
  const listTodoUseCase = new ListTodosUseCase(createTodoRepository())
  return new ListTodosController(listTodoUseCase)
}

export const createDeleteTodoController = () => {
  const deleteTodoUseCase = new DeleteTodoUseCase(createTodoRepository(), new TodoValidator())
  return new DeleteTodoController(deleteTodoUseCase)
}

export const createGetTodoController = () => {
  const getTodoUseCase = new GetTodoUseCase(createTodoRepository(), new TodoValidator())
  return new GetTodoController(getTodoUseCase)
}

export const createUpdateTodoController = () => {
  const updateTodoUseCase = new UpdateTodoUseCase(createTodoRepository(), new TodoValidator())
  return new UpdateTodoController(updateTodoUseCase)
}

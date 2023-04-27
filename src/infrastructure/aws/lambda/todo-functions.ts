import { awsHandlerAdapter } from '@/infrastructure/adapaters/aws/aws-handler.adapter'
import { TodoControllersFactory } from '@/main/factories/controllers/todo-controllers.factory'

export const createTodo = awsHandlerAdapter(TodoControllersFactory.createCreateTodoController())
export const updateTodo = awsHandlerAdapter(TodoControllersFactory.createUpdateTodoController())
export const getTodo = awsHandlerAdapter(TodoControllersFactory.createGetTodoController())
export const listTodos = awsHandlerAdapter(TodoControllersFactory.createListTodoController())
export const deleteTodo = awsHandlerAdapter(TodoControllersFactory.createDeleteTodoController())

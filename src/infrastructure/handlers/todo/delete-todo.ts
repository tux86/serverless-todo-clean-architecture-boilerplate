import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'
import { DeleteTodoControllerFactory } from '@/main/factories/controllers/todo/delete-todo-controller.factory'

const deleteTodoController = DeleteTodoControllerFactory.getInstance()
export const handler = lambdaHandlerAdapter(deleteTodoController)

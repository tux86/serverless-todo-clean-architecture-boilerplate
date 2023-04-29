import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'
import { UpdateTodoControllerFactory } from '@/main/factories/controllers/todo/update-todo-controller.factory'

const updateTodoController = UpdateTodoControllerFactory.getInstance()
export const handler = lambdaHandlerAdapter(updateTodoController)

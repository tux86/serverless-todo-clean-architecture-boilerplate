import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'
import { GetTodoControllerFactory } from '@/main/factories/controllers/todo/get-todo-controller.factory'

const getTodoController = GetTodoControllerFactory.getInstance()
export const handler = lambdaHandlerAdapter(getTodoController)

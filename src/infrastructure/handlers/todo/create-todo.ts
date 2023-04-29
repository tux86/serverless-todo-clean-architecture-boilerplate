import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'
import { CreateTodoControllerFactory } from '@/main/factories/controllers/todo/create-todo-controller.factory'

const createTodoController = CreateTodoControllerFactory.getInstance()

export const handler = lambdaHandlerAdapter(createTodoController)

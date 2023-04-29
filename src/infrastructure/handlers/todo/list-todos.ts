import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'
import { ListTodosControllerFactory } from '@/main/factories/controllers/todo/list-todos-controller.factory'

const listTodosController = ListTodosControllerFactory.getInstance()

export const handler = lambdaHandlerAdapter(listTodosController)

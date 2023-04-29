import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'
import { createListTodosController } from '@/main/factories/controllers/todo.controllers.factory'

export const handler = lambdaHandlerAdapter(createListTodosController())

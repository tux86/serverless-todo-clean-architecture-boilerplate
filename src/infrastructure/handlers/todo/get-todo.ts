import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'
import { createGetTodoController } from '@/main/factories/controllers/todo.controllers.factory'

export const handler = lambdaHandlerAdapter(createGetTodoController())

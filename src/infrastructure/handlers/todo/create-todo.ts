import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'
import { createCreateTodoController } from '@/main/factories/controllers/todo.controllers.factory'

export const handler = lambdaHandlerAdapter(createCreateTodoController())

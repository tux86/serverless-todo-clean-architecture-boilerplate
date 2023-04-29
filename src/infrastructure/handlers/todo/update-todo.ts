import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'
import { createUpdateTodoController } from '@/main/factories/controllers/todo.controllers.factory'

export const handler = lambdaHandlerAdapter(createUpdateTodoController())

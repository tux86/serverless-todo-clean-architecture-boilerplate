import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'
import { createDeleteTodoController } from '@/main/factories/controllers/todo.controllers.factory'

export const handler = lambdaHandlerAdapter(createDeleteTodoController())

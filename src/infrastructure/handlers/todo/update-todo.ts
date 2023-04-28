import 'reflect-metadata'
import { UpdateTodoController } from '@/api/controllers/todo/update-todo.controller'
import { DIContainer } from '@/common/ioc/di-container'
import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'

const updateTodoController = DIContainer.getInstance().get(UpdateTodoController)
export const handler = lambdaHandlerAdapter(updateTodoController)

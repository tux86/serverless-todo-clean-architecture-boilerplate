import 'reflect-metadata'
import { DIContainer } from '@/common/ioc/di-container'
import { lambdaHandlerAdapter } from '@/infrastructure/aws/adapaters/lambda-handler.adapter'
import { UpdateTodoController } from '@/presentation/controllers/todo/update-todo.controller'

const updateTodoController = DIContainer.getInstance().get(UpdateTodoController)
export const handler = lambdaHandlerAdapter(updateTodoController)

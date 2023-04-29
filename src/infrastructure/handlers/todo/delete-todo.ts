import 'reflect-metadata'
import { Controller } from '@/application/ports/controller'
import { DIContainer, TYPES } from '@/common/ioc'
import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'

const deleteTodoController = DIContainer.getInstance().get<Controller>(TYPES.DeleteTodoController)
export const handler = lambdaHandlerAdapter(deleteTodoController)

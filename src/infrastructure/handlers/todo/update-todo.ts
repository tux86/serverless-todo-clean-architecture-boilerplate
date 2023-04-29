import 'reflect-metadata'
import { Controller } from '@/application/ports/controller'
import { DIContainer, TYPES } from '@/common/ioc'
import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'

const updateTodoController = DIContainer.getInstance().get<Controller>(TYPES.UpdateTodoController)
export const handler = lambdaHandlerAdapter(updateTodoController)

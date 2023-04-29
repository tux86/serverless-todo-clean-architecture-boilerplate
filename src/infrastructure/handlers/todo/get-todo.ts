import 'reflect-metadata'
import { Controller } from '@/application/ports/controller'
import { DIContainer, TYPES } from '@/common/ioc'
import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'

const getTodosController = DIContainer.getInstance().get<Controller>(TYPES.GetTodoController)

export const handler = lambdaHandlerAdapter(getTodosController)

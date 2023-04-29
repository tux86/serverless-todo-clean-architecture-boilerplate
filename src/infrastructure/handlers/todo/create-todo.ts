import 'reflect-metadata'
import { Controller } from '@/application/ports/controller'
import { DIContainer, TYPES } from '@/common/ioc'
import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'

const createTodoController = DIContainer.getInstance().get<Controller>(TYPES.CreateTodoController)

export const handler = lambdaHandlerAdapter(createTodoController)

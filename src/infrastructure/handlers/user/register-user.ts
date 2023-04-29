import 'reflect-metadata'
import { Controller } from '@/application/ports/controller'
import { DIContainer, TYPES } from '@/common/ioc'
import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'

const registerUserController = DIContainer.getInstance().get<Controller>(TYPES.RegisterUserController)
export const handler = lambdaHandlerAdapter(registerUserController)

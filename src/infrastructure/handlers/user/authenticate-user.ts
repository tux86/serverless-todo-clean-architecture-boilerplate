import 'reflect-metadata'
import { Controller } from '@/application/ports/controller'
import { DIContainer, TYPES } from '@/common/ioc'
import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'

const authenticateUserController = DIContainer.getInstance().get<Controller>(TYPES.AuthenticateUserController)
export const handler = lambdaHandlerAdapter(authenticateUserController)

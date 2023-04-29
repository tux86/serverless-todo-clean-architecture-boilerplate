import 'reflect-metadata'
import { Controller } from '@/application/ports/controller'
import { DIContainer, TYPES } from '@/common/ioc'
import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'

const getUserController = DIContainer.getInstance().get<Controller>(TYPES.GetUserController)
export const handler = lambdaHandlerAdapter(getUserController)

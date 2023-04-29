import 'reflect-metadata'
import { Controller } from '@/application/ports/controller'
import { DIContainer, TYPES } from '@/common/ioc'
import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'

const deleteUserController = DIContainer.getInstance().get<Controller>(TYPES.DeleteUserController)
export const handler = lambdaHandlerAdapter(deleteUserController)

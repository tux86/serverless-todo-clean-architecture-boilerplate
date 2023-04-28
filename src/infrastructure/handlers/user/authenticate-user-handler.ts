import 'reflect-metadata'
import { AuthenticateUserController } from '@/api/controllers/user/authenticate-user.controller'
import { DIContainer } from '@/common/ioc/di-container'
import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'

const authenticateUserController = DIContainer.getInstance().get(AuthenticateUserController)
export const handler = lambdaHandlerAdapter(authenticateUserController)

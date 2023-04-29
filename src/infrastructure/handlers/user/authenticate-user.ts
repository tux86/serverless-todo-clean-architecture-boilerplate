import 'reflect-metadata'
import { DIContainer } from '@/common/ioc/di-container'
import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'
import { AuthenticateUserController } from '@/presentation/controllers/user/authenticate-user.controller'

const authenticateUserController = DIContainer.getInstance().get(AuthenticateUserController)
export const handler = lambdaHandlerAdapter(authenticateUserController)

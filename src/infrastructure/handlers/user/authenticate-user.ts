import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'
import { AuthenticateUserControllerFactory } from '@/main/factories/controllers/user/authenticate-user-controller.factory'

const authenticateUserController = AuthenticateUserControllerFactory.getInstance()
export const handler = lambdaHandlerAdapter(authenticateUserController)

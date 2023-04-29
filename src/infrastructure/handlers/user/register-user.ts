import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'
import { RegisterUserControllerFactory } from '@/main/factories/controllers/user/register-user-controller.factory'

const registerUserController = RegisterUserControllerFactory.getInstance()
export const handler = lambdaHandlerAdapter(registerUserController)

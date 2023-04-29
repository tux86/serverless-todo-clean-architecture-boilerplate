import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'
import { GetUserControllerFactory } from '@/main/factories/controllers/user/get-user-controller.factory'

const getUserController = GetUserControllerFactory.getInstance()
export const handler = lambdaHandlerAdapter(getUserController)

import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'
import { DeleteUserControllerFactory } from '@/main/factories/controllers/user/delete-user-controller.factory'

const deleteUserController = DeleteUserControllerFactory.getInstance()
export const handler = lambdaHandlerAdapter(deleteUserController)

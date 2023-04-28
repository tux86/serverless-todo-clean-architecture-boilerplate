import 'reflect-metadata'
import { DIContainer } from '@/common/ioc/di-container'
import { lambdaHandlerAdapter } from '@/infrastructure/aws/adapaters/lambda-handler.adapter'
import { DeleteUserController } from '@/presentation/controllers/user/delete-user.controller'

const deleteUserController = DIContainer.getInstance().get(DeleteUserController)
export const handler = lambdaHandlerAdapter(deleteUserController)

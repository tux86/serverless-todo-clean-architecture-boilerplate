import 'reflect-metadata'
import { DeleteUserController } from '@/api/controllers/user/delete-user.controller'
import { DIContainer } from '@/common/ioc/di-container'
import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'

const deleteUserController = DIContainer.getInstance().get(DeleteUserController)
export const handler = lambdaHandlerAdapter(deleteUserController)

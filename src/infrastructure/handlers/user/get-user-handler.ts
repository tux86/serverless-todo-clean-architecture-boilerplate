import 'reflect-metadata'
import { GetUserController } from '@/api/controllers/user/get-user.controller'
import { DIContainer } from '@/common/ioc/di-container'
import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'

const getUserController = DIContainer.getInstance().get(GetUserController)
export const handler = lambdaHandlerAdapter(getUserController)

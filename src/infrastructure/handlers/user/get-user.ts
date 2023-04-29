import 'reflect-metadata'
import { DIContainer } from '@/common/ioc/di-container'
import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'
import { GetUserController } from '@/presentation/controllers/user/get-user.controller'

const getUserController = DIContainer.getInstance().get(GetUserController)
export const handler = lambdaHandlerAdapter(getUserController)

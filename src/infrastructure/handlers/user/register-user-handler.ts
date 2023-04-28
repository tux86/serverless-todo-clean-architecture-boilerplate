import 'reflect-metadata'
import { RegisterUserController } from '@/api/controllers/user/register-user.controller'
import { DIContainer } from '@/common/ioc/di-container'
import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'

const registerUserController = DIContainer.getInstance().get(RegisterUserController)
export const handler = lambdaHandlerAdapter(registerUserController)

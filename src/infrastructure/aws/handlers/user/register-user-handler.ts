import 'reflect-metadata'
import { DIContainer } from '@/common/ioc/di-container'
import { lambdaHandlerAdapter } from '@/infrastructure/aws/adapaters/lambda-handler.adapter'
import { RegisterUserController } from '@/presentation/controllers/user/register-user.controller'

const registerUserController = DIContainer.getInstance().get(RegisterUserController)
export const handler = lambdaHandlerAdapter(registerUserController)

import 'reflect-metadata'
import { container } from '@/common/ioc/container'
import { TYPES } from '@/common/ioc/types'
import { awsHandlerAdapter } from '@/infrastructure/aws/adapaters/aws-handler.adapter'
import { RegisterUserController } from '@/presentation/controllers/user/register-user.controller'

const registerUserController = container.get<RegisterUserController>(TYPES.RegisterUserController)
export const handler = awsHandlerAdapter(registerUserController)

import 'reflect-metadata'
import { awsHandlerAdapter } from '@/infrastructure/aws/adapaters/aws-handler.adapter'
import { container } from '@/ioc/container'
import { TYPES } from '@/ioc/types'
import { RegisterUserController } from '@/presentation/controllers/user/register-user.controller'

const registerUserController = container.get<RegisterUserController>(TYPES.RegisterUserController)
export const handler = awsHandlerAdapter(registerUserController)

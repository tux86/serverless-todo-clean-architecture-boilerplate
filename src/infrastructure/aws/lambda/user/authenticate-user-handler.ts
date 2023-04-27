import 'reflect-metadata'
import { awsHandlerAdapter } from '@/infrastructure/adapaters/aws/aws-handler.adapter'
import { container } from '@/ioc/container'
import { TYPES } from '@/ioc/types'
import { AuthenticateUserController } from '@/presentation/controllers/user/authenticate-user.controller'

const authenticateUserController = container.get<AuthenticateUserController>(TYPES.AuthenticateUserController)
export const handler = awsHandlerAdapter(authenticateUserController)

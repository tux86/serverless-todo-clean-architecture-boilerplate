import 'reflect-metadata'
import { container } from '@/common/ioc/container'
import { TYPES } from '@/common/ioc/types'
import { awsHandlerAdapter } from '@/infrastructure/aws/adapaters/aws-handler.adapter'
import { AuthenticateUserController } from '@/presentation/controllers/user/authenticate-user.controller'

const authenticateUserController = container.get<AuthenticateUserController>(TYPES.AuthenticateUserController)
export const handler = awsHandlerAdapter(authenticateUserController)

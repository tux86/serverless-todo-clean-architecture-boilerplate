import 'reflect-metadata'
import { awsHandlerAdapter } from '@/infrastructure/aws/adapaters/aws-handler.adapter'
import { container } from '@/ioc/container'
import { TYPES } from '@/ioc/types'
import { GetUserController } from '@/presentation/controllers/user/get-user.controller'

const getUserController = container.get<GetUserController>(TYPES.GetUserController)
export const handler = awsHandlerAdapter(getUserController)

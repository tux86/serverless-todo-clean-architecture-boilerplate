import 'reflect-metadata'
import { container } from '@/common/ioc/container'
import { TYPES } from '@/common/ioc/types'
import { awsHandlerAdapter } from '@/infrastructure/aws/adapaters/aws-handler.adapter'
import { GetUserController } from '@/presentation/controllers/user/get-user.controller'

const getUserController = container.get<GetUserController>(TYPES.GetUserController)
export const handler = awsHandlerAdapter(getUserController)

import 'reflect-metadata'
import { container } from '@/common/ioc/container'
import { TYPES } from '@/common/ioc/types'
import { awsHandlerAdapter } from '@/infrastructure/aws/adapaters/aws-handler.adapter'
import { DeleteUserController } from '@/presentation/controllers/user/delete-user.controller'

const deleteUserController = container.get<DeleteUserController>(TYPES.DeleteUserController)
export const handler = awsHandlerAdapter(deleteUserController)

import 'reflect-metadata'
import { awsHandlerAdapter } from '@/infrastructure/adapaters/aws/aws-handler.adapter'
import { container } from '@/ioc/container'
import { TYPES } from '@/ioc/types'
import { DeleteUserController } from '@/presentation/controllers/user/delete-user.controller'

const deleteUserController = container.get<DeleteUserController>(TYPES.DeleteUserController)
export const handler = awsHandlerAdapter(deleteUserController)

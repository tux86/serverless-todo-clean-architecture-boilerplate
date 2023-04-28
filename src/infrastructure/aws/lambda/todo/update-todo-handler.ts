import 'reflect-metadata'
import { container } from '@/common/ioc/container'
import { TYPES } from '@/common/ioc/types'
import { awsHandlerAdapter } from '@/infrastructure/aws/adapaters/aws-handler.adapter'
import { UpdateTodoController } from '@/presentation/controllers/todo/update-todo.controller'

const updateTodoController = container.get<UpdateTodoController>(TYPES.UpdateTodoController)
export const handler = awsHandlerAdapter(updateTodoController)

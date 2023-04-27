import 'reflect-metadata'
import { awsHandlerAdapter } from '@/infrastructure/adapaters/aws/aws-handler.adapter'
import { container } from '@/ioc/container'
import { TYPES } from '@/ioc/types'
import { UpdateTodoController } from '@/presentation/controllers/todo/update-todo.controller'

const updateTodoController = container.get<UpdateTodoController>(TYPES.UpdateTodoController)
export const handler = awsHandlerAdapter(updateTodoController)

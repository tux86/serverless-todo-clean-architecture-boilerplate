import 'reflect-metadata'
import { container } from '@/common/ioc/container'
import { TYPES } from '@/common/ioc/types'
import { awsHandlerAdapter } from '@/infrastructure/aws/adapaters/aws-handler.adapter'
import { CreateTodoController } from '@/presentation/controllers/todo/create-todo.controller'

const createTodoController = container.get<CreateTodoController>(TYPES.CreateTodoController)

export const handler = awsHandlerAdapter(createTodoController)

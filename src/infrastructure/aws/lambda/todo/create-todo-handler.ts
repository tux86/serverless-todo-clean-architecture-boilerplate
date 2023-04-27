import 'reflect-metadata'
import { awsHandlerAdapter } from '@/infrastructure/aws/adapaters/aws-handler.adapter'
import { container } from '@/ioc/container'
import { TYPES } from '@/ioc/types'
import { CreateTodoController } from '@/presentation/controllers/todo/create-todo.controller'

const createTodoController = container.get<CreateTodoController>(TYPES.CreateTodoController)

export const handler = awsHandlerAdapter(createTodoController)

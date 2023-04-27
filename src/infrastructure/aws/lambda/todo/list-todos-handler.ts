import 'reflect-metadata'
import { awsHandlerAdapter } from '@/infrastructure/adapaters/aws/aws-handler.adapter'
import { container } from '@/ioc/container'
import { TYPES } from '@/ioc/types'
import { ListTodosController } from '@/presentation/controllers/todo/list-todos.controller'

const listTodosController = container.get<ListTodosController>(TYPES.ListTodosController)

export const handler = awsHandlerAdapter(listTodosController)

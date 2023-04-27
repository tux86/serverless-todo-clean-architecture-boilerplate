import 'reflect-metadata'
import { awsHandlerAdapter } from '@/infrastructure/aws/adapaters/aws-handler.adapter'
import { container } from '@/ioc/container'
import { TYPES } from '@/ioc/types'
import { ListTodosController } from '@/presentation/controllers/todo/list-todos.controller'

const listTodosController = container.get<ListTodosController>(TYPES.ListTodosController)

export const handler = awsHandlerAdapter(listTodosController)

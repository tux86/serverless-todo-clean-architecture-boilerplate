import 'reflect-metadata'
import { container } from '@/common/ioc/container'
import { TYPES } from '@/common/ioc/types'
import { awsHandlerAdapter } from '@/infrastructure/aws/adapaters/aws-handler.adapter'
import { ListTodosController } from '@/presentation/controllers/todo/list-todos.controller'

const listTodosController = container.get<ListTodosController>(TYPES.ListTodosController)

export const handler = awsHandlerAdapter(listTodosController)

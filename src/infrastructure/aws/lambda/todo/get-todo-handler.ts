import 'reflect-metadata'
import { awsHandlerAdapter } from '@/infrastructure/adapaters/aws/aws-handler.adapter'
import { container } from '@/ioc/container'
import { TYPES } from '@/ioc/types'
import { GetTodoController } from '@/presentation/controllers/todo/get-todo.controller'

const getTodosController = container.get<GetTodoController>(TYPES.GetTodoController)

export const handler = awsHandlerAdapter(getTodosController)

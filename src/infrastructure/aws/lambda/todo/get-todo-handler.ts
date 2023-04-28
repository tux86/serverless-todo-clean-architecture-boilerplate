import 'reflect-metadata'
import { container } from '@/common/ioc/container'
import { TYPES } from '@/common/ioc/types'
import { awsHandlerAdapter } from '@/infrastructure/aws/adapaters/aws-handler.adapter'
import { GetTodoController } from '@/presentation/controllers/todo/get-todo.controller'

const getTodosController = container.get<GetTodoController>(TYPES.GetTodoController)

export const handler = awsHandlerAdapter(getTodosController)

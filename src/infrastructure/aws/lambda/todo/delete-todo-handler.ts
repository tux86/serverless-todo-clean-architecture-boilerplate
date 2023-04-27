import 'reflect-metadata'
import { awsHandlerAdapter } from '@/infrastructure/adapaters/aws/aws-handler.adapter'
import { container } from '@/ioc/container'
import { TYPES } from '@/ioc/types'
import { DeleteTodoController } from '@/presentation/controllers/todo/delete-todo.controller'

const deleteTodoController = container.get<DeleteTodoController>(TYPES.DeleteTodoController)
export const handler = awsHandlerAdapter(deleteTodoController)

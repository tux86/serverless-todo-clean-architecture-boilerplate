import 'reflect-metadata'
import { container } from '@/common/ioc/container'
import { TYPES } from '@/common/ioc/types'
import { awsHandlerAdapter } from '@/infrastructure/aws/adapaters/aws-handler.adapter'
import { DeleteTodoController } from '@/presentation/controllers/todo/delete-todo.controller'

const deleteTodoController = container.get<DeleteTodoController>(TYPES.DeleteTodoController)
export const handler = awsHandlerAdapter(deleteTodoController)

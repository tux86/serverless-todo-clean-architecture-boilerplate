import 'reflect-metadata'
import { DeleteTodoController } from '@/api/controllers/todo/delete-todo.controller'
import { DIContainer } from '@/common/ioc/di-container'
import { lambdaHandlerAdapter } from '@/infrastructure/aws/adapaters/lambda-handler.adapter'

const deleteTodoController = DIContainer.getInstance().get(DeleteTodoController)
export const handler = lambdaHandlerAdapter(deleteTodoController)

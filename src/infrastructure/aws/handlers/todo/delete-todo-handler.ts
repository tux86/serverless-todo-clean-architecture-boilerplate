import 'reflect-metadata'
import { DIContainer } from '@/common/ioc/di-container'
import { lambdaHandlerAdapter } from '@/infrastructure/aws/adapaters/lambda-handler.adapter'
import { DeleteTodoController } from '@/presentation/controllers/todo/delete-todo.controller'

const deleteTodoController = DIContainer.getInstance().get(DeleteTodoController)
export const handler = lambdaHandlerAdapter(deleteTodoController)

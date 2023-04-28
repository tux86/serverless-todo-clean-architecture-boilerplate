import 'reflect-metadata'
import { GetTodoController } from '@/api/controllers/todo/get-todo.controller'
import { DIContainer } from '@/common/ioc/di-container'
import { lambdaHandlerAdapter } from '@/infrastructure/aws/adapaters/lambda-handler.adapter'

const getTodosController = DIContainer.getInstance().get(GetTodoController)

export const handler = lambdaHandlerAdapter(getTodosController)

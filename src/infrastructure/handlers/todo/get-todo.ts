import 'reflect-metadata'
import { DIContainer } from '@/common/ioc/di-container'
import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'
import { GetTodoController } from '@/presentation/controllers/todo/get-todo.controller'

const getTodosController = DIContainer.getInstance().get(GetTodoController)

export const handler = lambdaHandlerAdapter(getTodosController)

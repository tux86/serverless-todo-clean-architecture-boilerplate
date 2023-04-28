import 'reflect-metadata'
import { ListTodosController } from '@/api/controllers/todo/list-todos.controller'
import { DIContainer } from '@/common/ioc/di-container'
import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'

const listTodosController = DIContainer.getInstance().get(ListTodosController)

export const handler = lambdaHandlerAdapter(listTodosController)

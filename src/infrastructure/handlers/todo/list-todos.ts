import 'reflect-metadata'
import { DIContainer } from '@/common/ioc/di-container'
import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'
import { ListTodosController } from '@/presentation/controllers/todo/list-todos.controller'

const listTodosController = DIContainer.getInstance().get(ListTodosController)

export const handler = lambdaHandlerAdapter(listTodosController)

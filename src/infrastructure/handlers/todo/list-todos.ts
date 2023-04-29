import 'reflect-metadata'
import { DIContainer, TYPES } from '@/common/ioc'
import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'
import { ListTodosController } from '@/presentation/controllers/todo/list-todos.controller'

const listTodosController = DIContainer.getInstance().get<ListTodosController>(TYPES.Controller)

export const handler = lambdaHandlerAdapter(listTodosController)

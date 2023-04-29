import 'reflect-metadata'
import { DIContainer } from '@/common/ioc/di-container'
import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'
import { CreateTodoController } from '@/presentation/controllers/todo/create-todo.controller'

const createTodoController = DIContainer.getInstance().get(CreateTodoController)

export const handler = lambdaHandlerAdapter(createTodoController)

import 'reflect-metadata'
import { CreateTodoController } from '@/api/controllers/todo/create-todo.controller'
import { DIContainer } from '@/common/ioc/di-container'
import { lambdaHandlerAdapter } from '@/infrastructure/aws/adapaters/lambda-handler.adapter'

const createTodoController = DIContainer.getInstance().get(CreateTodoController)

export const handler = lambdaHandlerAdapter(createTodoController)

import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'
import { createRegisterUserController } from '@/main/factories/controllers/user.controllers.factory'

export const handler = lambdaHandlerAdapter(createRegisterUserController())

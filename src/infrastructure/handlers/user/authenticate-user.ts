import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'
import { createAuthenticateUserController } from '@/main/factories/controllers/user.controllers.factory'

export const handler = lambdaHandlerAdapter(createAuthenticateUserController())

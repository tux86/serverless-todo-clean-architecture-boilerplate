import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'
import {
  createAuthenticateUserController,
  createDeleteUserController,
  createGetUserController,
  createRegisterUserController
} from '@/main/factories/controllers/user.controllers.factory'

export const registerUserHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const handler = lambdaHandlerAdapter(createRegisterUserController())
  return await handler(event)
}

export const authenticateUserHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const handler = lambdaHandlerAdapter(createAuthenticateUserController())
  return await handler(event)
}

export const getUserHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const handler = lambdaHandlerAdapter(createGetUserController())
  return await handler(event)
}

export const deleteUserHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const handler = lambdaHandlerAdapter(createDeleteUserController())
  return await handler(event)
}

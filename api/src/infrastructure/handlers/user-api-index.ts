import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda'

import {
  createAuthenticateUserController,
  createDeleteUserController,
  createGetUserController,
  createRegisterUserController
} from '@/api/main/factories/controllers/user.controllers.factory'

import { lambdaHandlerAdapter } from '../adapaters/lambda-handler.adapter'

export const registerUserHandler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const handler = lambdaHandlerAdapter(createRegisterUserController())
  return await handler(event)
}

export const authenticateUserHandler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const handler = lambdaHandlerAdapter(createAuthenticateUserController())
  return await handler(event)
}

export const getUserHandler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const handler = lambdaHandlerAdapter(createGetUserController())
  return await handler(event)
}

export const deleteUserHandler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const handler = lambdaHandlerAdapter(createDeleteUserController())
  return await handler(event)
}

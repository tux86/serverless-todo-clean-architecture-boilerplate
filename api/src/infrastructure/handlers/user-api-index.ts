import 'reflect-metadata'
import { APIGatewayProxyEventV2, APIGatewayProxyEventV2WithJWTAuthorizer, APIGatewayProxyResultV2 } from 'aws-lambda'

import {
  createAdminUserController,
  createAuthenticateUserController,
  createDeleteUserController,
  createGetUserController,
  createListUsersController,
  createRegisterUserController,
  createUpdateUserController
} from '@/api/main/factories/controllers/user.controllers.factory'

import { lambdaHandlerAdapter } from '../adapaters/lambda-handler.adapter'

export const createAdminUserHandler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const handler = lambdaHandlerAdapter(createAdminUserController())
  return await handler(event)
}

export const registerUserHandler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const handler = lambdaHandlerAdapter(createRegisterUserController())
  return await handler(event)
}

export const updateUserHandler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const handler = lambdaHandlerAdapter(createUpdateUserController())
  return await handler(event)
}

export const authenticateUserHandler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const handler = lambdaHandlerAdapter(createAuthenticateUserController())
  return await handler(event)
}

export const getUserHandler = async (
  event: APIGatewayProxyEventV2WithJWTAuthorizer
): Promise<APIGatewayProxyResultV2> => {
  const handler = lambdaHandlerAdapter(createGetUserController())
  return await handler(event)
}

export const listUsersHandler = async (
  event: APIGatewayProxyEventV2WithJWTAuthorizer
): Promise<APIGatewayProxyResultV2> => {
  const handler = lambdaHandlerAdapter(createListUsersController())
  return await handler(event)
}

export const deleteUserHandler = async (
  event: APIGatewayProxyEventV2WithJWTAuthorizer
): Promise<APIGatewayProxyResultV2> => {
  const handler = lambdaHandlerAdapter(createDeleteUserController())
  return await handler(event)
}

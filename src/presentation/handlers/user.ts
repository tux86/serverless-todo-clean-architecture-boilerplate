import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { AuthenticateUserUseCase } from '@/application/use-cases/user/AuthenticateUserUseCase'
import { CreateUserUseCase } from '@/application/use-cases/user/CreateUserUseCase'
import { GetUserUseCase } from '@/application/use-cases/user/GetUserUseCase'
import { UserServiceImpl } from '@/infrastructure/aws/cognito/UserServiceImpl'
import { Config } from '@/infrastructure/Config'

import { UserController } from '../controllers/UserController'

const config = new Config()
const userService = new UserServiceImpl(config)
const createUserUserCase = new CreateUserUseCase(userService)
const authenticateUserUseCase = new AuthenticateUserUseCase(userService)
const getUserUseCase = new GetUserUseCase(userService)
const userController = new UserController(createUserUserCase, authenticateUserUseCase, getUserUseCase)
export const createUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return await userController.createUser(event)
}

export const authenticateUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return await userController.authenticateUser(event)
}

export const getUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return await userController.getUser(event)
}

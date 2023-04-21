import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { AuthenticateUserUseCase } from '@/application/usecases/user/AuthenticateUserUseCase'
import { CreateUserUseCase } from '@/application/usecases/user/CreateUserUseCase'
import { GetUserUseCase } from '@/application/usecases/user/GetUserUseCase'
import { UserServiceImpl } from '@/infra/aws/cognito/UserServiceImpl'
import { Config } from '@/infra/Config'

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

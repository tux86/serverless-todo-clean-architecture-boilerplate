import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { AuthenticateUser } from '../../application/use-cases/user/AuthenticateUser'
import { CreateUser } from '../../application/use-cases/user/CreateUser'
import { GetUser } from '../../application/use-cases/user/GetUser'
import { UserServiceImpl } from '../../infrastructure/aws/cognito/UserServiceImpl'
import { UserController } from '../controllers/UserController'

const userService = new UserServiceImpl()
const createUserUserCase = new CreateUser(userService)
const authenticateUserUseCase = new AuthenticateUser(userService)
const getUserUseCase = new GetUser(userService)
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

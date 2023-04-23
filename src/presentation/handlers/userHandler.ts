import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { AuthenticateUserUseCase } from '@/application/usecases/user/AuthenticateUserUseCase'
import { GetUserUseCase } from '@/application/usecases/user/GetUserUseCase'
import { RegisterUserUseCase } from '@/application/usecases/user/RegisterUserUseCase'
import { UserValidator } from '@/application/validators/UserValidator'
import { Config } from '@/infra/Config'
import { UserRepository } from '@/infra/repositories/UserRepositoryImpl'
import { CognitoUserServiceImpl } from '@/infra/services/CognitoUserServiceImpl'
import { UserServiceImpl } from '@/infra/services/UserServiceImpl'
import { withErrorHandling } from '@/presentation/middlewares/errorHandling'
import { parseBody, response } from '@/presentation/utils/apiGateway'
import { HttpStatus } from '@/presentation/utils/HttpStatus'

const { userPoolId, clientId } = Config.getInstance().cognito
const { usersTable } = Config.getInstance().dynamodb.tables

const cognitoUserServiceImpl = new CognitoUserServiceImpl(userPoolId, clientId)
const userRepository = new UserRepository(usersTable)
const userService = new UserServiceImpl(cognitoUserServiceImpl, userRepository)
const registerUserUseCase = new RegisterUserUseCase(userService, new UserValidator())
const authenticateUserUseCase = new AuthenticateUserUseCase(userService, new UserValidator())
const getUserUseCase = new GetUserUseCase(userService)

const registerUserHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const userData = parseBody(event.body) as any // TODO: fix this
  const user = await registerUserUseCase.execute(userData)
  return response(HttpStatus.CREATED, user)
}
export const registerUser = withErrorHandling(registerUserHandler)

const authenticateUserHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const authData = parseBody(event.body) as any // TODO: fix this
  const authentication = await authenticateUserUseCase.execute(authData)
  return response(HttpStatus.OK, authentication)
}
export const authenticateUser = withErrorHandling(authenticateUserHandler)

const getUserHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { email } = event.pathParameters || {}
  const user = await getUserUseCase.execute(email)
  return response(HttpStatus.OK, user)
}
export const getUser = withErrorHandling(getUserHandler)

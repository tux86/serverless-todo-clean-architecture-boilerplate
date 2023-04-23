import { APIGatewayProxyEvent, APIGatewayProxyResult, PreSignUpTriggerEvent } from 'aws-lambda'

import { AuthUserInput } from '@/application/dtos/user/AuthUserInput'
import { RegisterUserInput } from '@/application/dtos/user/RegisterUserInput'
import { AuthenticateUserUseCase } from '@/application/usecases/user/AuthenticateUserUseCase'
import { GetUserUseCase } from '@/application/usecases/user/GetUserUseCase'
import { RegisterUserUseCase } from '@/application/usecases/user/RegisterUserUseCase'
import { UserValidator } from '@/application/validators/UserValidator'
import { Config } from '@/infra/Config'
import { UserRepository } from '@/infra/repositories/UserRepositoryImpl'
import { CognitoUserServiceImpl } from '@/infra/services/CognitoUserServiceImpl'
import { UserServiceImpl } from '@/infra/services/UserServiceImpl'
import { parseApiGwRequestBody, toApiGwResponse } from '@/presentation/utils/apiGateway'
import { apiGatewayHandler } from '@/presentation/utils/apiGatewayHandler'
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
  const input = parseApiGwRequestBody<RegisterUserInput>(event.body)
  const user = await registerUserUseCase.execute(input)
  return toApiGwResponse(HttpStatus.CREATED, user)
}

const authenticateUserHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const input = parseApiGwRequestBody<AuthUserInput>(event.body)
  const authentication = await authenticateUserUseCase.execute(input)
  return toApiGwResponse(HttpStatus.OK, authentication)
}

const getUserHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { email } = event.pathParameters || {}
  const user = await getUserUseCase.execute(email)
  return toApiGwResponse(HttpStatus.OK, user)
}

export const preSignUp = async (event: PreSignUpTriggerEvent): Promise<PreSignUpTriggerEvent> => {
  event.response.autoConfirmUser = true
  event.response.autoVerifyEmail = true
  return event
}

export const registerUser = apiGatewayHandler(registerUserHandler)
export const authenticateUser = apiGatewayHandler(authenticateUserHandler)
export const getUser = apiGatewayHandler(getUserHandler)

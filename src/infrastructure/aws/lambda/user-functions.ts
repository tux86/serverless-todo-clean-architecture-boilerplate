import { PreSignUpTriggerEvent } from 'aws-lambda'

import { AuthenticateUser } from '@/application/usecases/user/authenticate-user'
import { GetUser } from '@/application/usecases/user/get-user'
import { RegisterUser } from '@/application/usecases/user/register-user'
import { UserValidator } from '@/application/validators/user.validator'
import { createApiGatewayHandler } from '@/infrastructure/aws/api-gw/libs/aws-handler-adapter'
import { cognitoConfig } from '@/infrastructure/aws/cognito/config'
import { dynamodbConfig } from '@/infrastructure/aws/dynamodb/config'
import { UserRepository } from '@/infrastructure/repositories/user-repository-impl'
import { CognitoUserServiceImpl } from '@/infrastructure/services/cognito-user-service-impl'
import { UserServiceImpl } from '@/infrastructure/services/user-service-impl'
import { AuthenticateUserController } from '@/presentation/controllers/user/authenticate-user-controller'
import { GetUserController } from '@/presentation/controllers/user/get-user-controller'
import { RegisterUserController } from '@/presentation/controllers/user/register-user-controller'

const cognitoUserServiceImpl = new CognitoUserServiceImpl(cognitoConfig.userPoolId, cognitoConfig.clientId)
const userRepository = new UserRepository(dynamodbConfig.tables.usersTable)
const userService = new UserServiceImpl(cognitoUserServiceImpl, userRepository)
const registerUserUseCase = new RegisterUser(userService, new UserValidator())
const authenticateUserUseCase = new AuthenticateUser(userService, new UserValidator())
const getUserUseCase = new GetUser(userService)

const registerUserController = new RegisterUserController(registerUserUseCase)
const authenticateUserController = new AuthenticateUserController(authenticateUserUseCase)
const getUserController = new GetUserController(getUserUseCase)

export const registerUser = createApiGatewayHandler(registerUserController)
export const authenticateUser = createApiGatewayHandler(authenticateUserController)
export const getUser = createApiGatewayHandler(getUserController)

export const preSignUp = async (event: PreSignUpTriggerEvent): Promise<PreSignUpTriggerEvent> => {
  event.response.autoConfirmUser = true
  event.response.autoVerifyEmail = true
  return event
}
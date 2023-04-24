import { PreSignUpTriggerEvent } from 'aws-lambda'

import { AuthenticateUser } from '@/application/usecases/user/AuthenticateUser'
import { GetUser } from '@/application/usecases/user/GetUser'
import { RegisterUser } from '@/application/usecases/user/RegisterUser'
import { UserValidator } from '@/application/validators/UserValidator'
import { createApiGatewayHandler } from '@/infrastructure/aws/awsHandlerAdapter'
import { Config } from '@/infrastructure/Config'
import { UserRepository } from '@/infrastructure/repositories/UserRepositoryImpl'
import { CognitoUserServiceImpl } from '@/infrastructure/services/CognitoUserServiceImpl'
import { UserServiceImpl } from '@/infrastructure/services/UserServiceImpl'
import { AuthenticateUserController } from '@/presentation/controllers/user/AuthenticateUserController'
import { GetUserController } from '@/presentation/controllers/user/GetUserController'
import { RegisterUserController } from '@/presentation/controllers/user/RegisterUserController'

const { userPoolId, clientId } = Config.getInstance().cognito
const { usersTable } = Config.getInstance().dynamodb.tables

const cognitoUserServiceImpl = new CognitoUserServiceImpl(userPoolId, clientId)
const userRepository = new UserRepository(usersTable)
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

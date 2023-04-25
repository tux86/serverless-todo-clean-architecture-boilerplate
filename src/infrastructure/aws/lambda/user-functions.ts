import { PreSignUpTriggerEvent } from 'aws-lambda'

import { AuthenticateUser } from '@/application/usecases/user/authenticate-user'
import { GetUser } from '@/application/usecases/user/get-user'
import { RegisterUser } from '@/application/usecases/user/register-user'
import { UserValidator } from '@/application/validators/user.validator'
import { createApiGatewayHandler } from '@/infrastructure/aws/api-gw/libs/aws-handler-adapter'
import { cognitoConfig } from '@/infrastructure/aws/cognito/config'
import { dynamodbConfig } from '@/infrastructure/aws/dynamodb/config'
import { UserDynamodbRepository } from '@/infrastructure/repositories/user.dynamodb.repository'
import { UserCognitoService } from '@/infrastructure/services/user.cognito.service'
import { UserServiceImpl } from '@/infrastructure/services/user.service-impl'
import { AuthenticateUserController } from '@/presentation/controllers/user/authenticate-user.controller'
import { GetUserController } from '@/presentation/controllers/user/get-user.controller'
import { RegisterUserController } from '@/presentation/controllers/user/register-user.controller'

const userCognitoService = new UserCognitoService(cognitoConfig.userPoolId, cognitoConfig.clientId)
const userDynamodbRepository = new UserDynamodbRepository(dynamodbConfig.tables.usersTable)
const userServiceImpl = new UserServiceImpl(userCognitoService, userDynamodbRepository)
const registerUserUseCase = new RegisterUser(userServiceImpl, new UserValidator())
const authenticateUserUseCase = new AuthenticateUser(userServiceImpl, new UserValidator())
const getUserUseCase = new GetUser(userServiceImpl)

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

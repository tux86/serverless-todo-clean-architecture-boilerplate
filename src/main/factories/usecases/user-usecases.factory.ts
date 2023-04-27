import { AuthenticateUser } from '@/application/usecases/user/authenticate-user'
import { DeleteUser } from '@/application/usecases/user/delete-user'
import { GetUser } from '@/application/usecases/user/get-user'
import { RegisterUser } from '@/application/usecases/user/register-user'
import { UserValidator } from '@/application/validators/user.validator'
import { awsConfig } from '@/infrastructure/config/aws'
import { dynamodbConfig } from '@/infrastructure/config/aws/dynamodb'
import { UserDynamodbRepository } from '@/infrastructure/implementation/repositories/user.dynamodb.repository'
import { UserCognitoService } from '@/infrastructure/implementation/services/user.cognito.service'
import { UserSecurityServiceImpl } from '@/infrastructure/implementation/services/user.security.service-impl'
import { cognitoIdentityProvider } from '@/infrastructure/providers/aws/cognito.provider'

const { userPoolId, clientId } = awsConfig.cognito

export class UserUseCasesFactory {
  static createRegisterUserUseCase(): RegisterUser {
    const userCognitoService = new UserCognitoService(cognitoIdentityProvider, userPoolId, clientId)
    const userDynamodbRepository = new UserDynamodbRepository(dynamodbConfig.tables.usersTable)
    const userSecurityServiceImpl = new UserSecurityServiceImpl(userCognitoService, userDynamodbRepository)
    return new RegisterUser(userSecurityServiceImpl, new UserValidator())
  }

  static createAuthenticateUserUseCase(): AuthenticateUser {
    const userCognitoService = new UserCognitoService(cognitoIdentityProvider, userPoolId, clientId)
    const userDynamodbRepository = new UserDynamodbRepository(dynamodbConfig.tables.usersTable)
    const userSecurityServiceImpl = new UserSecurityServiceImpl(userCognitoService, userDynamodbRepository)
    return new AuthenticateUser(userSecurityServiceImpl, new UserValidator())
  }

  static createGetUserUseCase(): GetUser {
    const userCognitoService = new UserCognitoService(cognitoIdentityProvider, userPoolId, clientId)
    const userDynamodbRepository = new UserDynamodbRepository(dynamodbConfig.tables.usersTable)
    const userSecurityServiceImpl = new UserSecurityServiceImpl(userCognitoService, userDynamodbRepository)
    return new GetUser(userSecurityServiceImpl)
  }

  static createDeleteUserUseCase(): DeleteUser {
    const userDynamodbRepository = new UserDynamodbRepository(dynamodbConfig.tables.usersTable)
    return new DeleteUser(userDynamodbRepository)
  }
}

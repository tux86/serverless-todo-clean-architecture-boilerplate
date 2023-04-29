import { AuthenticateUserUseCase } from '@/application/usecases/user/authenticate-user.use-case'
import { UserValidator } from '@/application/validators/user.validator'
import { DynamodbClientProvider } from '@/infrastructure/providers/dynamodb.provider'
import { DynamodbUserRepository } from '@/infrastructure/repositories/dynamodb.user.repository'
import { AuthServiceImpl } from '@/infrastructure/services/auth-service.impl'
import { CognitoUserServiceFactory } from '@/main/factories/services/cognito-user-service.factory'
import { AuthenticateUserController } from '@/presentation/controllers/user/authenticate-user.controller'

export class AuthenticateUserControllerFactory {
  public static getInstance(): AuthenticateUserController {
    const dynamodbClientProvider = new DynamodbClientProvider()
    const dynamodbUserRepository = new DynamodbUserRepository(dynamodbClientProvider)
    const cognitoUserService = CognitoUserServiceFactory.getInstance()
    const authService = new AuthServiceImpl(cognitoUserService, dynamodbUserRepository)
    const authenticateUserUseCase = new AuthenticateUserUseCase(authService, new UserValidator())
    return new AuthenticateUserController(authenticateUserUseCase)
  }
}

import { RegisterUserUseCase } from '@/application/usecases/user/register-user.use-case'
import { UserValidator } from '@/application/validators/user.validator'
import { DynamodbClientProvider } from '@/infrastructure/providers/dynamodb.provider'
import { DynamodbUserRepository } from '@/infrastructure/repositories/dynamodb.user.repository'
import { AuthServiceImpl } from '@/infrastructure/services/auth-service.impl'
import { CognitoUserServiceFactory } from '@/main/factories/services/cognito-user-service.factory'
import { RegisterUserController } from '@/presentation/controllers/user/register-user.controller'

export class RegisterUserControllerFactory {
  public static getInstance(): RegisterUserController {
    const dynamodbClientProvider = new DynamodbClientProvider()
    const dynamodbUserRepository = new DynamodbUserRepository(dynamodbClientProvider)
    const cognitoUserService = CognitoUserServiceFactory.getInstance()
    const authService = new AuthServiceImpl(cognitoUserService, dynamodbUserRepository)
    const registerUserUseCase = new RegisterUserUseCase(authService, new UserValidator())
    return new RegisterUserController(registerUserUseCase)
  }
}

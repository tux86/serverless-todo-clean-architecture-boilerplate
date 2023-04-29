import { GetUserUseCase } from '@/application/usecases/user/get-user.use-case'
import { UserValidator } from '@/application/validators/user.validator'
import { DynamodbClientProvider } from '@/infrastructure/providers/dynamodb.provider'
import { DynamodbUserRepository } from '@/infrastructure/repositories/dynamodb.user.repository'
import { GetUserController } from '@/presentation/controllers/user/get-user.controller'

export class GetUserControllerFactory {
  public static getInstance(): GetUserController {
    const dynamodbClientProvider = new DynamodbClientProvider()
    const dynamodbUserRepository = new DynamodbUserRepository(dynamodbClientProvider)
    const getUserUseCase = new GetUserUseCase(dynamodbUserRepository, new UserValidator())
    return new GetUserController(getUserUseCase)
  }
}

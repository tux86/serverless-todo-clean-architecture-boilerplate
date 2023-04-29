import { DeleteUserUseCase } from '@/application/usecases/user/delete-user.use-case'
import { UserValidator } from '@/application/validators/user.validator'
import { DynamodbClientProvider } from '@/infrastructure/providers/dynamodb.provider'
import { DynamodbUserRepository } from '@/infrastructure/repositories/dynamodb.user.repository'
import { DeleteUserController } from '@/presentation/controllers/user/delete-user.controller'

export class DeleteUserControllerFactory {
  public static getInstance(): DeleteUserController {
    const dynamodbClientProvider = new DynamodbClientProvider()
    const dynamodbUserRepository = new DynamodbUserRepository(dynamodbClientProvider)
    const deleteUserUseCase = new DeleteUserUseCase(dynamodbUserRepository, new UserValidator())
    return new DeleteUserController(deleteUserUseCase)
  }
}

import { AuthSuccessResult } from '@/application/dtos/user/auth-success-result'
import { User } from '@/domain/models/user'
import { UserService } from '@/domain/services/user-service'
import { UserDynamodbRepository } from '@/infrastructure/repositories/user.dynamodb.repository'
import { UserCognitoService } from '@/infrastructure/services/user.cognito.service'

export class UserServiceImpl implements UserService {
  constructor(readonly userCognitoService: UserCognitoService, readonly userRepository: UserDynamodbRepository) {}

  async registerUser(user: User, password: string): Promise<User> {
    // TODO: should be safe using a transaction
    // Store user in Cognito
    await this.userCognitoService.createUser(user.email)
    // Set permanent password for the user
    await this.userCognitoService.setUserPassword(user.email, password)
    // Store user in Dynamodb
    return await this.userRepository.create(user)
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email)
  }

  async authenticateUser(email: string, password: string): Promise<AuthSuccessResult> {
    return this.userCognitoService.authenticateUser(email, password)
  }
}

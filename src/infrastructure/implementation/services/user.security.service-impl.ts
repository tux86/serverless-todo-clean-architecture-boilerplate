import { AuthSuccessResult } from '@/application/dtos/user/auth-success-result'
import { User } from '@/domain/models/user'
import { UserSecurityService } from '@/domain/services/user-security-service'
import { UserDynamodbRepository } from '@/infrastructure/implementation/repositories/user.dynamodb.repository'
import { UserCognitoService } from '@/infrastructure/implementation/services/user.cognito.service'

export class UserSecurityServiceImpl implements UserSecurityService {
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

  async authenticateUser(email: string, password: string): Promise<AuthSuccessResult> {
    return this.userCognitoService.authenticateUser(email, password)
  }
}

import { AuthSuccessResult } from '@/application/dtos/user/AuthSuccessResult'
import { User } from '@/domain/models/User'
import { UserService } from '@/domain/services/UserService'
import { UserRepository } from '@/infrastructure/repositories/UserRepositoryImpl'
import { CognitoUserServiceImpl } from '@/infrastructure/services/CognitoUserServiceImpl'

export class UserServiceImpl implements UserService {
  constructor(readonly cognitoUserService: CognitoUserServiceImpl, readonly userRepository: UserRepository) {}

  async registerUser(user: User, password: string): Promise<User> {
    // TODO: should be safe using a transaction
    // Store user in Cognito
    await this.cognitoUserService.createUser(user.email)
    // Set permanent password for the user
    await this.cognitoUserService.setUserPassword(user.email, password)
    // Store user in Dynamodb
    return await this.userRepository.create(user)
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email)
  }

  async authenticateUser(email: string, password: string): Promise<AuthSuccessResult> {
    return this.cognitoUserService.authenticateUser(email, password)
  }
}

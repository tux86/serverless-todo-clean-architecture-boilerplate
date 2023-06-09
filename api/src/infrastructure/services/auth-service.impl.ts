import { UsernameExistsException } from '@aws-sdk/client-cognito-identity-provider'

import { AuthSuccessResult } from '@/api/application/dtos/user/auth-success.result'
import { UserAccountAlreadyExists } from '@/api/application/errors'
import { User } from '@/api/domain/models/user'
import { AuthService } from '@/api/domain/services/auth.service'

import { CognitoUserService } from './cognito-user.service'
import { DynamodbUserRepository } from '../repositories/dynamodb.user.repository'

export class AuthServiceImpl implements AuthService {
  constructor(readonly cognitoUserService: CognitoUserService, readonly userRepository: DynamodbUserRepository) {}

  async registerUser(user: User, password: string): Promise<User> {
    try {
      // Store user in Dynamodb
      const dbUser = await this.userRepository.create(user)
      // TODO: should be safe using a transaction
      // Store user in Cognito
      await this.cognitoUserService.createUser(dbUser.email)
      // Set permanent password for the user
      await this.cognitoUserService.setUserPassword(dbUser.email, password)

      return dbUser
    } catch (error) {
      if (error instanceof UsernameExistsException) {
        throw new UserAccountAlreadyExists()
      }
      throw error
    }
  }

  async authenticateUser(userId: string, password: string): Promise<AuthSuccessResult> {
    return this.cognitoUserService.authenticateUser(userId, password)
  }
}

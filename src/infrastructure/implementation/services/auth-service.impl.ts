import { inject, injectable } from 'inversify'

import { AuthSuccessResult } from '@/application/dtos/user/auth-success-result'
import { User } from '@/domain/models/user'
import { AuthService } from '@/domain/services/auth-service'
import { Logger } from '@/infrastructure/helpers/Logger'
import { UserDynamodbRepository } from '@/infrastructure/implementation/repositories/user.dynamodb.repository'
import { UserCognitoService } from '@/infrastructure/implementation/services/user.cognito.service'
import { TYPES } from '@/ioc/types'

const logger = Logger.getInstance()

@injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    @inject(TYPES.UserCognitoService) readonly userCognitoService: UserCognitoService,
    @inject(TYPES.UserDynamodbRepository)
    readonly userRepository: UserDynamodbRepository
  ) {
    logger.info('----------------------- initializing AuthServiceImpl -------------------')
  }

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

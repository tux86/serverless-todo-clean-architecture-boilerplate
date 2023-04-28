import { inject, injectable } from 'inversify'

import { AuthSuccessResult } from '@/application/dtos/user/auth-success-result'
import { TYPES } from '@/common/ioc/types'
import { User } from '@/domain/models/user'
import { AuthService } from '@/domain/services/auth-service'
import { UserDynamodbRepository } from '@/infrastructure/aws/repositories/user.dynamodb.repository'
import { UserCognitoService } from '@/infrastructure/aws/services/user.cognito.service'
import { Logger } from '@/infrastructure/utils/Logger'

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

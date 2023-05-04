import { createCognitoIdentityProvider } from './providers.factory'
import { createUserRepository } from './repositories.factory'
import { AuthServiceImpl } from '../../infrastructure/services/auth-service.impl'
import { CognitoUserService } from '../../infrastructure/services/cognito-user.service'

export const createCognitoUserService = (): CognitoUserService =>
  new CognitoUserService(createCognitoIdentityProvider())
export const createAuthServiceImpl = (): AuthServiceImpl =>
  new AuthServiceImpl(createCognitoUserService(), createUserRepository())

import { createCognitoIdentityProvider } from './providers.factory'
import { createUserRepository } from './repositories.factory'
import { AuthServiceImpl } from '../../infrastructure/services/auth-service.impl'
import { CognitoUserService } from '../../infrastructure/services/cognito-user.service'

export const createCognitoUserService = () => new CognitoUserService(createCognitoIdentityProvider())
export const createAuthServiceImpl = () => new AuthServiceImpl(createCognitoUserService(), createUserRepository())

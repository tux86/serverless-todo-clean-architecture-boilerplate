import { AuthServiceImpl } from '@/infrastructure/services/auth-service.impl'
import { CognitoUserService } from '@/infrastructure/services/cognito-user.service'
import { createCognitoIdentityProvider } from '@/main/factories/providers.factory'
import { createUserRepository } from '@/main/factories/repositories.factory'

export const createCognitoUserService = () => new CognitoUserService(createCognitoIdentityProvider())
export const createAuthServiceImpl = () => new AuthServiceImpl(createCognitoUserService(), createUserRepository())

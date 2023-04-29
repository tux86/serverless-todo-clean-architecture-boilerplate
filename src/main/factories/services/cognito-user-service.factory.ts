import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider'

import { AWS_CONFIG } from '@/infrastructure/config'
import { CognitoUserService } from '@/infrastructure/services/cognito-user.service'

export class CognitoUserServiceFactory {
  static getInstance(): CognitoUserService {
    const cognitoIdentityProvider = new CognitoIdentityProvider({ region: AWS_CONFIG.region })
    return new CognitoUserService(cognitoIdentityProvider)
  }
}

import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider'

import { AWS_CONFIG } from '../../infrastructure/config'

export const createCognitoIdentityProvider = (): CognitoIdentityProvider =>
  new CognitoIdentityProvider({ region: AWS_CONFIG.region })

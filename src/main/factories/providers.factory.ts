import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider'

import { AWS_CONFIG } from '@/infrastructure/config'

export const createCognitoIdentityProvider = () => new CognitoIdentityProvider({ region: AWS_CONFIG.region })

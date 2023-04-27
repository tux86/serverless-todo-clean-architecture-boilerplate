import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider'

import { awsConfig } from '@/infrastructure/config/aws'

export const cognitoIdentityProvider = new CognitoIdentityProvider({ region: awsConfig.region })

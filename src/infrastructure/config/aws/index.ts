import { cognitoConfig } from '@/infrastructure/config/aws/cognito.config'

export const awsConfig = {
  region: process.env.AWS_REGION,
  cognito: cognitoConfig
}

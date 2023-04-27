import { cognitoConfig } from '@/infrastructure/aws/config/cognito.config'

export const awsConfig = {
  region: process.env.AWS_REGION,
  cognito: cognitoConfig
}

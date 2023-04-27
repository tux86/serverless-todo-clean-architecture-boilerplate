import { cognitoConfig } from '@/infrastructure/config/aws/cognito'
import { dynamodbConfig } from '@/infrastructure/config/aws/dynamodb'

export const awsConfig = {
  region: process.env.AWS_REGION,
  cognito: cognitoConfig,
  dynamodb: dynamodbConfig
}

import { COGNITO_CONFIG } from '@/infrastructure/config/cognito.config'

export const AWS_CONFIG = {
  region: process.env.AWS_REGION,
  cognito: COGNITO_CONFIG
}

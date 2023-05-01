import * as process from 'process'

import { COGNITO_CONFIG } from './cognito.config'
import { DYNAMODB_CONFIG } from './dynamodb.config'

export const AWS_CONFIG = {
  region: process.env.AWS_REGION,
  stage: process.env.STAGE,
  cognito: COGNITO_CONFIG,
  dynamodb: DYNAMODB_CONFIG
}

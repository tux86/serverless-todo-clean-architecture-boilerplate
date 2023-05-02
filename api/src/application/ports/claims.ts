import { StringMap } from 'aws-lambda/trigger/cognito-user-pool-trigger/_common'

export interface Claims extends StringMap {
  userId: string
  email: string
  exp: string
  iat: string
}

import { StringMap } from 'aws-lambda/trigger/cognito-user-pool-trigger/_common'

import { Role } from '@/api/domain/models/user'

export interface Claims extends StringMap {
  userId: string
  email: string
  role: Role
}

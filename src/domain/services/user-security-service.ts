import { AuthSuccessResult } from '@/application/dtos/user/auth-success-result'

import { User } from '../models/user'

export interface UserSecurityService {
  registerUser(user: User, password: string): Promise<User>

  authenticateUser(email: string, password: string): Promise<AuthSuccessResult>
}

import { AuthSuccessResult } from '@/api/application/dtos/user/auth-success.result'

import { User } from '../models/user'

export interface AuthService {
  registerUser(user: User, password: string): Promise<User>

  authenticateUser(email: string, password: string): Promise<AuthSuccessResult>
}

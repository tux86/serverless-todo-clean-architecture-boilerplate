import { AuthSuccessResult } from '@/application/usecases/user/authenticate-user/auth-success.result'

import { User } from '../models/user'

export interface AuthService {
  registerUser(user: User, password: string): Promise<User>

  authenticateUser(email: string, password: string): Promise<AuthSuccessResult>
}

import { AuthSuccessResult } from '@/application/dtos/user/auth-success-result'

import { User } from '../models/user'

export interface UserService {
  registerUser(user: User, password: string): Promise<User>

  findUserByEmail(email: string): Promise<User | null>

  authenticateUser(email: string, password: string): Promise<AuthSuccessResult>
}

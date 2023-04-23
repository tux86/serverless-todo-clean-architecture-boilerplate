import { AuthSuccessResult } from '@/application/dtos/user/AuthSuccessResult'

import { User } from '../entities/User'

export interface UserService {
    registerUser(user: User, password: string): Promise<User>;

    findUserByEmail(email: string): Promise<User | null>;

    authenticateUser(email: string, password: string): Promise<AuthSuccessResult>
}

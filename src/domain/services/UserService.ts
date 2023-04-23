import { User } from '../entities/User'

export interface UserService {
    createUser(user: User): Promise<User>;

    findUserByEmail(email: string): Promise<User | null>;

    authenticateUser(email: string, password: string): Promise<string>
}

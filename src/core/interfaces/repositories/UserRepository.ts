import { User } from '../../domain/User';

export interface UserRepository {
    createUser(user: User): Promise<User>;
    getUserById(id: string): Promise<User | null>;
    getUserByUsername(username: string): Promise<User | null>;
    updateUser(user: User): Promise<User>;
    deleteUser(id: string): Promise<void>;
}
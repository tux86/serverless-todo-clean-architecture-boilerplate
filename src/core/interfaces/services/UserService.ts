import { User } from '../../domain/User';

export interface UserService {
    createUser(username: string, email: string, password: string): Promise<User>;
    getUserById(id: string): Promise<User | null>;
    getUserByUsername(username: string): Promise<User | null>;
    updateUser(id: string, username: string, email: string): Promise<User>;
    deleteUser(id: string): Promise<void>;
}
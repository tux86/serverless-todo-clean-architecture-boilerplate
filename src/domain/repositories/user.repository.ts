import { User } from '@/domain/models/user'

import { Repository } from './repository'

export interface UserRepository extends Repository<User> {
  create(user: User): Promise<User>

  delete(id: string): Promise<void>

  update(user: User): Promise<User>

  findById(userId: string): Promise<User | null>

  findAll(): Promise<User[]>
}

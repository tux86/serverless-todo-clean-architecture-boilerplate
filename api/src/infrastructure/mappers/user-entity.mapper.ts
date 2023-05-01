import { User } from '@/api/domain/models/user'

import { IMapper } from './mapper'
import { UserEntity } from '../entities/user.entity'

export class UserEntityMapper implements IMapper<Partial<UserEntity>, User> {
  toDomainModel(userEntity: UserEntity): User {
    const { userId, firstName, lastName, email, createdAt, updatedAt } = userEntity

    return {
      userId,
      firstName,
      lastName,
      email,
      createdAt: createdAt ? new Date(createdAt) : undefined,
      updatedAt: updatedAt ? new Date(updatedAt) : undefined
    }
  }

  toPersistenceEntity(user: Partial<User>): Partial<UserEntity> {
    const { userId, firstName, lastName, email, createdAt, updatedAt } = user

    return {
      userId,
      firstName,
      lastName,
      email,
      createdAt: createdAt?.toISOString(),
      updatedAt: updatedAt?.toISOString()
    }
  }
}

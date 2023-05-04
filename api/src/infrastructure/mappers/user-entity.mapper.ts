import { User } from '@/api/domain/models/user'

import { IMapper } from './mapper'
import { UserEntity } from '../entities/user.entity'

export class UserEntityMapper implements IMapper<Partial<UserEntity>, User> {
  toDomainModel(userEntity: UserEntity): User {
    const { userId, firstName, lastName, email, role, lastLoggedAt, createdAt, updatedAt } = userEntity

    return new User({
      userId,
      firstName,
      lastName,
      email,
      role,
      lastLoggedAt: lastLoggedAt ? new Date(lastLoggedAt) : undefined,
      createdAt: createdAt ? new Date(createdAt) : undefined,
      updatedAt: updatedAt ? new Date(updatedAt) : undefined
    })
  }

  toPersistenceEntity(user: Partial<User>): Partial<UserEntity> {
    const { userId, firstName, lastName, email, role, lastLoggedAt, createdAt, updatedAt } = user

    return new UserEntity({
      userId,
      firstName,
      lastName,
      email,
      role,
      lastLoggedAt: lastLoggedAt?.toISOString(),
      createdAt: createdAt?.toISOString(),
      updatedAt: updatedAt?.toISOString()
    })
  }
}

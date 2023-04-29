import { User } from '@/domain/models/user'
import { UserEntity } from '@/infrastructure/entities/user.entity'
import { IMapper } from '@/infrastructure/mappers/mapper'

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

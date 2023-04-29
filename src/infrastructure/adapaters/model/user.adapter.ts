import { User } from '@/domain/models/user'
import { UserEntity } from '@/infrastructure/entities/user.entity'

export class UserAdapter {
  static toDomainEntity(userModel: UserEntity): User {
    const { userId, firstName, lastName, email } = userModel
    const user: User = { userId, firstName, lastName, email }
    return user
  }

  static toPersistenceModel(userEntity: User): UserEntity {
    const { userId, firstName, lastName, email } = userEntity
    const userModel: User = {
      userId,
      firstName,
      lastName,
      email
    }
    return userModel
  }
}

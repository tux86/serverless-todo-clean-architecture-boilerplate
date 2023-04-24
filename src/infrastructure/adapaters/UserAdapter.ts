import { User } from '@/domain/models/User'
import { UserEntity } from '@/infrastructure/entities/UserEntity'

export class UserAdapter {
  static toDomainEntity(userModel: UserEntity): User {
    const { firstName, lastName, email } = userModel
    return new User(firstName, lastName, email)
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

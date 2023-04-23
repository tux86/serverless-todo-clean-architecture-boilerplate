import { User } from '@/domain/entities/User'
import { UserEntity } from '@/infra/entities/UserEntity'

export class UserAdapter {
  static toDomainEntity(userModel: User): UserEntity {
    const { userId, firstName, lastName, email } = userModel
    const userEntity = new UserEntity(firstName, lastName, email, userId)
    return userEntity
  }

  static toPersistenceModel(userEntity: UserEntity): User {
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

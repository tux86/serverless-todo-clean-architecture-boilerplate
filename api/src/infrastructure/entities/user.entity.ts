import { Role } from '@/api/domain/models/user'

export class UserEntity {
  readonly userId: string
  readonly firstName: string
  readonly lastName: string
  readonly email: string
  readonly role: Role
  readonly createdAt: string
  readonly updatedAt?: string

  constructor(userEntity: UserEntity) {
    this.userId = userEntity.userId
    this.firstName = userEntity.firstName
    this.lastName = userEntity.lastName
    this.email = userEntity.email
    this.role = userEntity.role
    this._lastLoggedAt = userEntity._lastLoggedAt
    this.createdAt = userEntity.createdAt
    this.updatedAt = userEntity.updatedAt
  }

  private _lastLoggedAt?: string

  get lastLoggedAt(): string {
    return this._lastLoggedAt
  }

  set lastLoggedAt(value: string) {
    this._lastLoggedAt = value
  }
}

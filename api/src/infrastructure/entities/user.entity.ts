import { Role } from '@/api/domain/models/user'

export class UserEntity {
  public userId: string
  public firstName: string
  public lastName: string
  public email: string
  public role: Role
  public lastLoggedAt?: string
  public createdAt: string
  public updatedAt?: string
}

import { User } from '@/domain/models/user'

export class UserEntity implements User {
  public userId: string
  public firstName: string
  public lastName: string
  public email: string
}

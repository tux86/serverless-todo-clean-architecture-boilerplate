import { uuidV4 } from '@/domain/utils/uuidGenerator'

export class User {
  public userId: string
  public firstName: string
  public lastName: string
  public email: string

  constructor(firstName: string, lastName: string, email: string) {
    this.userId = uuidV4()
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
  }
}

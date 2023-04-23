import { v4 as uuidv4 } from 'uuid'

export class UserEntity {
  public userId: string
  public firstName: string
  public lastName: string
  public email: string

  constructor(firstName: string, lastName: string, email: string, userId?: string) {
    this.userId = userId || uuidv4()
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
  }
}

import { v4 as uuidv4 } from 'uuid'

export class User {
  public userId: string
  public firstName: string
  public lastName: string
  public email: string

  constructor(firstName: string, lastName: string, email: string) {
    this.userId = uuidv4()
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
  }
}

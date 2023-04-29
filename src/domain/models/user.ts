export class User {
  public userId: string
  public firstName: string
  public lastName: string
  public email: string

  constructor(props: User) {
    this.userId = props.userId
    this.firstName = props.firstName
    this.lastName = props.lastName
    this.email = props.email
  }
}

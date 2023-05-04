export type Role = 'user' | 'admin'
const canonicalizeEmail = (email: string): string => {
  return email.trim().toLowerCase()
}

export class User {
  readonly userId: string
  readonly firstName: string
  readonly lastName: string
  readonly email: string
  readonly role: Role
  readonly lastLoggedAt?: Date
  readonly createdAt: Date
  readonly updatedAt?: Date

  constructor(user: User) {
    this.userId = user.userId
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.email = canonicalizeEmail(user.email)
    this.role = user.role
    this.lastLoggedAt = user.lastLoggedAt
    this.createdAt = user.createdAt
    this.updatedAt = user.updatedAt
  }
}

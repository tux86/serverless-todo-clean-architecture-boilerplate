export type Role = 'user' | 'admin'

export interface User {
  userId: string
  firstName: string
  lastName: string
  email: string
  role: Role
  lastLoggedAt?: Date
  createdAt: Date
  updatedAt?: Date
}

export interface User {
  userId: string
  firstName: string
  lastName: string
  email: string
  lastLoggedAt?: Date
  createdAt: Date
  updatedAt?: Date
}

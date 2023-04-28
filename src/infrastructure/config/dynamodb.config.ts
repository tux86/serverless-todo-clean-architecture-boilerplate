import * as process from 'process'

export const DYNAMODB_CONFIG = {
  usersTable: {
    name: process.env.USERS_TABLE
  },
  todosTable: {
    name: process.env.TODOS_TABLE
  }
}

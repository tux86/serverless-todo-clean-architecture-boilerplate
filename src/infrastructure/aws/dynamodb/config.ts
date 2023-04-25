export const dynamodbConfig = {
  region: process.env.AWS_REGION,
  tables: {
    todosTable: process.env.TODOS_TABLE,
    usersTable: process.env.USERS_TABLE
  }
}

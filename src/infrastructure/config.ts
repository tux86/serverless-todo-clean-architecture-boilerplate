
export const config = {
  region: process.env.AWS_REGION,
  todosTable: process.env.TODOS_TABLE,
  cognito: {
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    client: process.env.COGNITO_APP_CLIENT_ID
  }
}

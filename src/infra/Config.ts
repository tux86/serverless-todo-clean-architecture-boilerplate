
export class Config {
  public readonly region : string

  public readonly todosTable : string

  public readonly cognito : {
    userPoolId: string,
    clientId: string
  }

  constructor () {
    this.region = process.env.AWS_REGION
    this.todosTable = process.env.TODOS_TABLE
    this.cognito = {
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      clientId: process.env.COGNITO_APP_CLIENT_ID
    }
  }

  public static getInstance () : Config {
    return new Config()
  }
}

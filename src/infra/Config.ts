
export class Config {
  public readonly region : string

  public readonly dynamodb: {
    tables: {
      todosTable : string,
      usersTable : string
    }
  }

  public readonly cognito : {
    userPoolId: string,
    clientId: string
  }

  constructor () {
    this.region = process.env.AWS_REGION

    // DynamoDB
    this.dynamodb = {
      tables: {
        todosTable: process.env.TODOS_TABLE,
        usersTable: process.env.USERS_TABLE
      }
    }

    // Cognito
    this.cognito = {
      userPoolId: process.env.COGNITO_USER_POOL_ID,
      clientId: process.env.COGNITO_APP_CLIENT_ID
    }
  }

  public static getInstance () : Config {
    return new Config()
  }
}

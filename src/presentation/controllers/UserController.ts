import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { AuthenticateUserUseCase } from '@/application/usecases/user/AuthenticateUserUseCase'
import { CreateUserUseCase } from '@/application/usecases/user/CreateUserUseCase'
import { GetUserUseCase } from '@/application/usecases/user/GetUserUseCase'
import { HttpStatus } from '@/common/enums/HttpStatus'
import { parseBody, response } from '@/infra/aws/api-gw/helpers'

export class UserController {
  constructor (
        private createUserUseCase: CreateUserUseCase,
        private authenticateUserUseCase: AuthenticateUserUseCase,
        private getUserUseCase: GetUserUseCase
  ) {
  }

  async createUser (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      const userData = parseBody(event.body) as any // TODO: fix this
      const user = await this.createUserUseCase.execute(userData.email, userData.password)
      return response(HttpStatus.CREATED, user)
    } catch (error) {
      return response(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR, { message: error.message })
    }
  }

  async authenticateUser (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      const authData = parseBody(event.body) as any // TODO: fix this
      const authentication = await this.authenticateUserUseCase.execute(authData.email, authData.password)
      return response(HttpStatus.OK, authentication)
    } catch (error) {
      return response(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR, { message: error.message })
    }
  }

  async getUser (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      const { email } = event.pathParameters || {}
      const user = await this.getUserUseCase.execute(email)
      return response(HttpStatus.OK, user)
    } catch (error) {
      return response(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR, { message: error.message })
    }
  }
}

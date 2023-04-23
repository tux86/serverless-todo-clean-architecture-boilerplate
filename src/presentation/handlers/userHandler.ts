import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { AuthenticateUserUseCase } from '@/application/usecases/user/AuthenticateUserUseCase'
import { CreateUserUseCase } from '@/application/usecases/user/CreateUserUseCase'
import { GetUserUseCase } from '@/application/usecases/user/GetUserUseCase'
import { UserValidator } from '@/application/validators/UserValidator'
import { Config } from '@/infra/Config'
import { UserServiceImpl } from '@/infra/services/UserServiceImpl'
import { parseBody, response } from '@/presentation/utils/apiGateway'
import { HttpStatus } from '@/presentation/utils/HttpStatus'

const { userPoolId, clientId } = Config.getInstance().cognito
const userService = new UserServiceImpl(userPoolId, clientId)
const createUserUseCase = new CreateUserUseCase(userService)
const authenticateUserUseCase = new AuthenticateUserUseCase(userService, new UserValidator())
const getUserUseCase = new GetUserUseCase(userService)

export const createUser = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const userData = parseBody(event.body) as any // TODO: fix this
    const user = await createUserUseCase.execute(userData)
    return response(HttpStatus.CREATED, user)
  } catch (error) {
    return response(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR, { message: error.message })
  }
}

export const authenticateUser = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const authData = parseBody(event.body) as any // TODO: fix this
    const authentication = await authenticateUserUseCase.execute(authData)
    return response(HttpStatus.OK, authentication)
  } catch (error) {
    return response(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR, { message: error.message })
  }
}

export const getUser = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { email } = event.pathParameters || {}
    const user = await getUserUseCase.execute(email)
    return response(HttpStatus.OK, user)
  } catch (error) {
    return response(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR, { message: error.message })
  }
}

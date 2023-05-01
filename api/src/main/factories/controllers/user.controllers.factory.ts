import { AuthenticateUserUseCase } from '@/api/application/usecases/user/authenticate-user.use-case'
import { DeleteUserUseCase } from '@/api/application/usecases/user/delete-user.use-case'
import { GetUserUseCase } from '@/api/application/usecases/user/get-user.use-case'
import { RegisterUserUseCase } from '@/api/application/usecases/user/register-user.use-case'
import { UserValidator } from '@/api/application/validators/user.validator'

import { AuthenticateUserController } from '../../../presentation/controllers/user/authenticate-user.controller'
import { DeleteUserController } from '../../../presentation/controllers/user/delete-user.controller'
import { GetUserController } from '../../../presentation/controllers/user/get-user.controller'
import { RegisterUserController } from '../../../presentation/controllers/user/register-user.controller'
import { createUserRepository } from '../repositories.factory'
import { createAuthServiceImpl } from '../user.services.factory'

export const createAuthenticateUserController = () => {
  const authenticateUserUseCase = new AuthenticateUserUseCase(createAuthServiceImpl(), new UserValidator())
  return new AuthenticateUserController(authenticateUserUseCase)
}

export const createDeleteUserController = () => {
  const deleteUserUseCase = new DeleteUserUseCase(createUserRepository(), new UserValidator())
  return new DeleteUserController(deleteUserUseCase)
}

export const createGetUserController = () => {
  const getUserUseCase = new GetUserUseCase(createUserRepository(), new UserValidator())
  return new GetUserController(getUserUseCase)
}

export const createRegisterUserController = () => {
  const registerUserUseCase = new RegisterUserUseCase(createAuthServiceImpl(), new UserValidator())
  return new RegisterUserController(registerUserUseCase)
}

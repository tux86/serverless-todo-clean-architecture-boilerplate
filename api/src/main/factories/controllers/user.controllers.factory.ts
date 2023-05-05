import { AuthenticateUserUseCase } from '@/api/application/use-cases/user/authenticate-user.use-case'
import { CreateAdminUserUseCase } from '@/api/application/use-cases/user/create-admin-user.use-case'
import { DeleteUserUseCase } from '@/api/application/use-cases/user/delete-user.use-case'
import { GetUserUseCase } from '@/api/application/use-cases/user/get-user.use-case'
import { ListUsersUseCase } from '@/api/application/use-cases/user/list-users.use-case'
import { RegisterUserUseCase } from '@/api/application/use-cases/user/register-user.use-case'
import { UpdateUserUseCase } from '@/api/application/use-cases/user/update-user.use-case'
import { UserValidator } from '@/api/application/validators/user.validator'
import { AuthenticateUserController } from '@/api/presentation/controllers/user/authenticate-user.controller'
import { CreateAdminUserController } from '@/api/presentation/controllers/user/create-admin-user.controller'
import { DeleteUserController } from '@/api/presentation/controllers/user/delete-user.controller'
import { GetMeController } from '@/api/presentation/controllers/user/get-me.controller'
import { GetUserController } from '@/api/presentation/controllers/user/get-user.controller'
import { ListUsersController } from '@/api/presentation/controllers/user/list-users.controller'
import { RegisterUserController } from '@/api/presentation/controllers/user/register-user.controller'
import { UpdateUserController } from '@/api/presentation/controllers/user/update-user.controller'

import { createUserRepository } from '../repositories.factory'
import { createAuthServiceImpl } from '../user.services.factory'

export const createAdminUserController = (): CreateAdminUserController => {
  const createAdminUserUseCase = new CreateAdminUserUseCase(createAuthServiceImpl(), new UserValidator())
  return new CreateAdminUserController(createAdminUserUseCase)
}

export const createRegisterUserController = (): RegisterUserController => {
  const registerUserUseCase = new RegisterUserUseCase(createAuthServiceImpl(), new UserValidator())
  return new RegisterUserController(registerUserUseCase)
}

export const createAuthenticateUserController = (): AuthenticateUserController => {
  const authenticateUserUseCase = new AuthenticateUserUseCase(createAuthServiceImpl(), new UserValidator())
  return new AuthenticateUserController(authenticateUserUseCase)
}

export const createUpdateUserController = (): UpdateUserController => {
  const updateUserUseCase = new UpdateUserUseCase(createUserRepository(), new UserValidator())
  return new UpdateUserController(updateUserUseCase)
}

export const createDeleteUserController = (): DeleteUserController => {
  const deleteUserUseCase = new DeleteUserUseCase(createUserRepository(), new UserValidator())
  return new DeleteUserController(deleteUserUseCase)
}

export const createGetUserController = (): GetUserController => {
  const getUserUseCase = new GetUserUseCase(createUserRepository(), new UserValidator())
  return new GetUserController(getUserUseCase)
}

export const createGetMeController = (): GetMeController => {
  const getUserUseCase = new GetUserUseCase(createUserRepository(), new UserValidator())
  return new GetMeController(getUserUseCase)
}

export const createListUsersController = (): ListUsersController => {
  const listUsersUseCase = new ListUsersUseCase(createUserRepository(), new UserValidator())
  return new ListUsersController(listUsersUseCase)
}

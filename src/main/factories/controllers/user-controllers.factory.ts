import { UserUseCasesFactory } from '@/main/factories/usecases/user-usecases.factory'
import { AuthenticateUserController } from '@/presentation/controllers/user/authenticate-user.controller'
import { DeleteUserController } from '@/presentation/controllers/user/delete-user.controller'
import { GetUserController } from '@/presentation/controllers/user/get-user.controller'
import { RegisterUserController } from '@/presentation/controllers/user/register-user.controller'

export class UserControllersFactory {
  static createRegisterUserController(): RegisterUserController {
    return new RegisterUserController(UserUseCasesFactory.createRegisterUserUseCase())
  }

  static createAuthenticateUserController(): AuthenticateUserController {
    return new AuthenticateUserController(UserUseCasesFactory.createAuthenticateUserUseCase())
  }

  static createGetUserController(): GetUserController {
    return new GetUserController(UserUseCasesFactory.createGetUserUseCase())
  }

  static createDeleteUserController(): DeleteUserController {
    return new DeleteUserController(UserUseCasesFactory.createDeleteUserUseCase())
  }
}

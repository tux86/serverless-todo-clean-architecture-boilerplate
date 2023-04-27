import { inject, injectable } from 'inversify'

import { EntityNotFound } from '@/application/errors'
import { UseCase } from '@/application/usecases/use-case'
import { User } from '@/domain/models/user'
import { AuthService } from '@/domain/services/auth-service'
import { TYPES } from '@/ioc/types'

@injectable()
export class GetUser implements UseCase<string, User> {
  constructor(@inject(TYPES.AuthServiceImpl) private readonly authService: AuthService) {}

  async execute(email: string): Promise<User | never> {
    const user = await this.authService.authenticateUser('', '')
    if (!user) {
      throw new EntityNotFound(User.name, email)
    }
    return new User('', '', '')
  }
}

import { UpdateUserInput } from '@/api/application/dtos/user/update-user.input'
import { EntityNotFound, UserForbiddenError } from '@/api/application/errors'
import { UserValidator } from '@/api/application/validators/user.validator'
import { User } from '@/api/domain/models/user'
import { UserRepository } from '@/api/domain/repositories/user.repository'

import { UseCase } from '../use-case'

export class UpdateUserUseCase implements UseCase<UpdateUserInput, User> {
  constructor(private readonly userRepository: UserRepository, private readonly validator: UserValidator) {}

  async execute(input: UpdateUserInput): Promise<User> {
    this.validator.validateAndThrow(UpdateUserInput, input)

    const { requesterInfo, payload } = input

    const existingUser = await this.userRepository.findById(payload.userId)

    if (!existingUser) {
      throw new EntityNotFound(User.name, payload.userId)
    }

    if (requesterInfo.role !== 'admin' && existingUser.userId !== requesterInfo.userId) {
      throw new UserForbiddenError('User not authorized to update this user')
    }

    const user = new User({
      ...existingUser,
      ...payload,
      updatedAt: new Date()
    })

    return await this.userRepository.update(user)
  }
}

import {
  PreSignUpTriggerEvent,
  PreSignUpTriggerHandler,
  PreTokenGenerationTriggerEvent,
  PreTokenGenerationTriggerHandler
} from 'aws-lambda'

import { EntityNotFound } from '@/api/application/errors'
import { Logger } from '@/api/application/utlis/Logger'
import { UserEntity } from '@/api/infrastructure/entities/user.entity'
import { createUserRepository } from '@/api/main/factories/repositories.factory'

const userRepository = createUserRepository()

export const preSignUpHandler: PreSignUpTriggerHandler = async (
  event: PreSignUpTriggerEvent
): Promise<PreSignUpTriggerEvent> => {
  event.response.autoConfirmUser = true
  event.response.autoVerifyEmail = true
  return event
}

export const preTokenGenerationHandler: PreTokenGenerationTriggerHandler = async (
  event: PreTokenGenerationTriggerEvent
): Promise<PreTokenGenerationTriggerEvent> => {
  if (event.triggerSource === 'TokenGeneration_Authentication') {
    try {
      const { email } = event.request.userAttributes
      const dbUser = await userRepository.findByEmail(email)

      if (!dbUser) {
        Logger.getInstance().error(`user with email "${email}" not found in database`)
        throw new EntityNotFound(UserEntity.name, email)
      }

      // set lastLoggedAt in db
      dbUser.lastLoggedAt = new Date()
      await userRepository.update(dbUser)

      event.response.claimsOverrideDetails = {
        claimsToAddOrOverride: {
          userId: dbUser.userId,
          email: dbUser.email,
          role: dbUser.role
        },
        claimsToSuppress: []
      }
      return event
    } catch (error: any) {
      Logger.getInstance().error('Failed to update claims', error)
      throw new Error('Failed to update claims')
    }
  }
}

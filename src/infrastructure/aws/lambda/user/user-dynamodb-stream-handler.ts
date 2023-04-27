import 'reflect-metadata'
import { DynamoDBStreamEvent, DynamoDBStreamHandler } from 'aws-lambda'

import { UserCognitoService } from '@/infrastructure/aws/implementation/services/user.cognito.service'
import { container } from '@/ioc/container'
import { TYPES } from '@/ioc/types'

const userCognitoService = container.get<UserCognitoService>(TYPES.UserCognitoService)
export const handler: DynamoDBStreamHandler = async (event: DynamoDBStreamEvent) => {
  for (const record of event.Records) {
    // Deletes a user from the Cognito User Pool by their email address
    if (record.eventName === 'REMOVE') {
      const email = record.dynamodb.OldImage.email.S

      await userCognitoService.delete(email)
    }
  }
}

import 'reflect-metadata'
import { DynamoDBStreamEvent, DynamoDBStreamHandler } from 'aws-lambda'

import { container } from '@/common/ioc/container'
import { TYPES } from '@/common/ioc/types'
import { UserCognitoService } from '@/infrastructure/aws/services/user.cognito.service'

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

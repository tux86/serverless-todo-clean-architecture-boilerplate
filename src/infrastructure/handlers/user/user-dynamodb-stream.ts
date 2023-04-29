import 'reflect-metadata'
import { DynamoDBStreamEvent, DynamoDBStreamHandler } from 'aws-lambda'

import { DIContainer, TYPES } from '@/common/ioc'
import { CognitoUserService } from '@/infrastructure/services/cognito-user.service'

const userCognitoService = DIContainer.getInstance().get<CognitoUserService>(TYPES.CognitoUserService)
export const handler: DynamoDBStreamHandler = async (event: DynamoDBStreamEvent) => {
  for (const record of event.Records) {
    // Deletes a user from the Cognito User Pool by their email address
    if (record.eventName === 'REMOVE') {
      const email = record.dynamodb.OldImage.email.S

      await userCognitoService.delete(email)
    }
  }
}

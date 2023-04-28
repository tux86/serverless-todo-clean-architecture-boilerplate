import 'reflect-metadata'
import { DynamoDBStreamEvent, DynamoDBStreamHandler } from 'aws-lambda'

import { DIContainer } from '@/common/ioc/di-container'
import { CognitoUserService } from '@/infrastructure/aws/services/cognito.user.service'

const userCognitoService = DIContainer.getInstance().get(CognitoUserService)
export const handler: DynamoDBStreamHandler = async (event: DynamoDBStreamEvent) => {
  for (const record of event.Records) {
    // Deletes a user from the Cognito User Pool by their email address
    if (record.eventName === 'REMOVE') {
      const email = record.dynamodb.OldImage.email.S

      await userCognitoService.delete(email)
    }
  }
}

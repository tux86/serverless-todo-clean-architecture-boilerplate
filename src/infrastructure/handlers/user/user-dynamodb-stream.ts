import { DynamoDBStreamEvent, DynamoDBStreamHandler } from 'aws-lambda'

import { CognitoUserServiceFactory } from '@/main/factories/services/cognito-user-service.factory'

const cognitoUserService = CognitoUserServiceFactory.getInstance()
export const handler: DynamoDBStreamHandler = async (event: DynamoDBStreamEvent) => {
  for (const record of event.Records) {
    // Deletes a user from the Cognito User Pool by their email address
    if (record.eventName === 'REMOVE') {
      const email = record.dynamodb.OldImage.email.S

      await cognitoUserService.delete(email)
    }
  }
}

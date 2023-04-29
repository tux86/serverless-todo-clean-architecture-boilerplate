import { DynamoDBStreamEvent, DynamoDBStreamHandler } from 'aws-lambda'

import { createCognitoUserService } from '@/main/factories/user.services.factory'

const cognitoUserService = createCognitoUserService()
export const handler: DynamoDBStreamHandler = async (event: DynamoDBStreamEvent) => {
  for (const record of event.Records) {
    // Deletes a user from the Cognito User Pool by their email address
    if (record.eventName === 'REMOVE') {
      const email = record.dynamodb.OldImage.email.S

      await cognitoUserService.delete(email)
    }
  }
}

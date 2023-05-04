import 'reflect-metadata'
import { DynamoDBStreamEvent, DynamoDBStreamHandler } from 'aws-lambda'

import { Logger } from '@/api/application/utlis/Logger'
import { createCognitoUserService } from '@/api/main/factories/user.services.factory'

const cognitoUserService = createCognitoUserService()
export const dynamoDBStreamHandler: DynamoDBStreamHandler = async (event: DynamoDBStreamEvent) => {
  for (const record of event.Records) {
    // Handle the removal of a user by deleting their account from the Cognito User Pool using their email address.
    if (record.eventName === 'REMOVE') {
      const email = record.dynamodb.OldImage.email.S
      try {
        await cognitoUserService.delete(email)
      } catch (error: any) {
        Logger.getInstance().error(`Failed to delete user [email=${email}]`, error)
      }
    }
    // Handle email modification by updating the user's email in Cognito to ensure consistent authentication.
    else if (record.eventName === 'MODIFY') {
      const oldEmail = record.dynamodb.OldImage.email.S
      const newEmail = record.dynamodb.NewImage.email.S
      try {
        if (oldEmail !== newEmail) {
          await cognitoUserService.updateUserEmail(oldEmail, newEmail)
        }
      } catch (error: any) {
        Logger.getInstance().error(`Failed to update user email [oldEmail=${oldEmail}, newEmail=${newEmail}]`, error)
      }
    }
  }
}

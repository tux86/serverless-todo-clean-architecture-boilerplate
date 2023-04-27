import { DynamoDBStreamEvent, DynamoDBStreamHandler, PreSignUpTriggerEvent } from 'aws-lambda'

import { awsHandlerAdapter } from '@/infrastructure/adapaters/aws/aws-handler.adapter'
import { awsConfig } from '@/infrastructure/config/aws'
import { UserCognitoService } from '@/infrastructure/implementation/services/user.cognito.service'
import { cognitoIdentityProvider } from '@/infrastructure/providers/aws/cognito.provider'
import { UserControllersFactory } from '@/main/factories/controllers/user-controllers.factory'

const { userPoolId, clientId } = awsConfig.cognito

const userCognitoService = new UserCognitoService(cognitoIdentityProvider, userPoolId, clientId)
export const registerUser = awsHandlerAdapter(UserControllersFactory.createRegisterUserController())
export const authenticateUser = awsHandlerAdapter(UserControllersFactory.createAuthenticateUserController())
export const getUser = awsHandlerAdapter(UserControllersFactory.createGetUserController())
export const deleteUser = awsHandlerAdapter(UserControllersFactory.createDeleteUserController())

export const preSignUp = async (event: PreSignUpTriggerEvent): Promise<PreSignUpTriggerEvent> => {
  event.response.autoConfirmUser = true
  event.response.autoVerifyEmail = true
  return event
}

export const userDynamodbStreamHandler: DynamoDBStreamHandler = async (event: DynamoDBStreamEvent) => {
  for (const record of event.Records) {
    // Deletes a user from the Cognito User Pool by their email address
    if (record.eventName === 'REMOVE') {
      const email = record.dynamodb.OldImage.email.S

      await userCognitoService.delete(email)
    }
  }
}

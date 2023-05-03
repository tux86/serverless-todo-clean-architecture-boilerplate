import {
  AdminCreateUserCommand,
  AdminDeleteUserCommand,
  AdminGetUserCommand,
  AdminInitiateAuthCommand,
  AdminSetUserPasswordCommand,
  AdminUpdateUserAttributesCommand,
  AuthFlowType,
  CognitoIdentityProvider
} from '@aws-sdk/client-cognito-identity-provider'

import { AuthSuccessResult } from '@/api/application/dtos/user/auth-success.result'
import { AuthUser } from '@/api/domain/models/auth-user'

import { AWS_CONFIG } from '../config'
import { COGNITO_CONFIG } from '../config/cognito.config'

export class CognitoUserService {
  private readonly userPoolId: string = AWS_CONFIG.cognito.userPoolId
  private readonly clientId: string = AWS_CONFIG.cognito.clientId

  constructor(private readonly cognitoIdentityProvider: CognitoIdentityProvider) {}

  async createUser(email: string): Promise<void> {
    const command = new AdminCreateUserCommand({
      UserPoolId: COGNITO_CONFIG.userPoolId,
      Username: email,
      MessageAction: 'SUPPRESS', // Prevents sending a welcome email
      UserAttributes: [
        {
          Name: 'email_verified',
          Value: 'true'
        },
        {
          Name: 'email',
          Value: email
        }
      ]
    })

    await this.cognitoIdentityProvider.send(command)
  }

  async setUserPassword(email: string, password: string): Promise<void> {
    const command = new AdminSetUserPasswordCommand({
      UserPoolId: this.userPoolId,
      Username: email,
      Password: password,
      Permanent: true
    })
    await this.cognitoIdentityProvider.send(command)
  }

  async getUserByEmail(email: string): Promise<AuthUser | null> {
    try {
      const command = new AdminGetUserCommand({
        UserPoolId: this.userPoolId,
        Username: email
      })

      const response = await this.cognitoIdentityProvider.send(command)
      const userIdAttribute = response.UserAttributes?.find((attr) => attr.Name === 'sub')

      if (!userIdAttribute) {
        return null
      }

      return new AuthUser(email, userIdAttribute.Value || '')
    } catch (error) {
      if (error.code === 'UserNotFoundException') {
        return null
      }
      throw error
    }
  }

  async authenticateUser(email: string, password: string): Promise<AuthSuccessResult> {
    const command = new AdminInitiateAuthCommand({
      AuthFlow: AuthFlowType.ADMIN_USER_PASSWORD_AUTH,
      UserPoolId: this.userPoolId,
      ClientId: this.clientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password
      }
    })

    const response = await this.cognitoIdentityProvider.send(command)

    if (!response.AuthenticationResult) {
      throw new Error('AuthenticationResult is missing from the response.')
    } else if (!response.AuthenticationResult.IdToken) {
      throw new Error('IdToken is missing from the AuthenticationResult.')
    }

    return new AuthSuccessResult(response.AuthenticationResult?.IdToken || '')
  }

  async updateUserEmail(oldEmail: string, newEmail: string): Promise<void> {
    const command = new AdminUpdateUserAttributesCommand({
      UserPoolId: this.userPoolId,
      Username: oldEmail,
      UserAttributes: [
        {
          Name: 'email',
          Value: newEmail
        },
        {
          Name: 'email_verified',
          Value: 'true'
        }
      ]
    })

    await this.cognitoIdentityProvider.send(command)
  }

  async delete(email: string): Promise<void> {
    const command = new AdminDeleteUserCommand({
      UserPoolId: this.userPoolId,
      Username: email
    })

    await this.cognitoIdentityProvider.send(command)
  }
}

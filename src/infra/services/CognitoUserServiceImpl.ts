import {
  AdminCreateUserCommand,
  AuthFlowType,
  CognitoIdentityProvider, InitiateAuthCommand,
  ListUsersCommand
} from '@aws-sdk/client-cognito-identity-provider'

import { AuthSuccessResult } from '@/application/dtos/user/AuthSuccessResult'
import { AuthUser } from '@/domain/models/AuthUser'

export class CognitoUserServiceImpl {
  private cognitoIdentityProvider: CognitoIdentityProvider

  constructor (readonly userPoolId: string, readonly clientId: string) {
    this.cognitoIdentityProvider = new CognitoIdentityProvider({})
  }

  async createUser (email: string, password: string): Promise<void> {
    const command = new AdminCreateUserCommand({
      UserPoolId: this.userPoolId,
      Username: email,
      MessageAction: 'SUPPRESS', // Prevents sending a welcome email
      TemporaryPassword: password,
      UserAttributes: [
        {
          Name: 'email',
          Value: email
        },
        {
          Name: 'email_verified',
          Value: 'true'
        }
      ]
    })

    await this.cognitoIdentityProvider.send(command)
  }

  async findUserByEmail (email: string): Promise<AuthUser | null> {
    const command = new ListUsersCommand({
      UserPoolId: this.userPoolId,
      Filter: `email = "${email}"`
    })

    const response = await this.cognitoIdentityProvider.send(command)
    const user = response.Users?.[0]

    if (!user) return null

    return new AuthUser(user.Username, user.Attributes?.find((attr) => attr.Name === 'email')?.Value || '')
  }

  async authenticateUser (email: string, password: string): Promise<AuthSuccessResult> {
    const command = new InitiateAuthCommand({
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      ClientId: this.clientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password
      }
    })

    const response = await this.cognitoIdentityProvider.send(command)

    if (!response.AuthenticationResult) {
      throw new Error('AuthenticationResult is missing from the response.')
    } else if (!response.AuthenticationResult.AccessToken) {
      throw new Error('AccessToken is missing from the AuthenticationResult.')
    }

    return new AuthSuccessResult(response.AuthenticationResult?.AccessToken || '')
  }
}

import {
  AdminCreateUserCommand,
  AdminDeleteUserCommand,
  AdminInitiateAuthCommand,
  AdminSetUserPasswordCommand,
  AuthFlowType,
  CognitoIdentityProvider,
  ListUsersCommand
} from '@aws-sdk/client-cognito-identity-provider'
import { injectable } from 'inversify'

import { AuthSuccessResult } from '@/application/dtos/user/auth-success-result'
import { AuthUser } from '@/domain/models/auth-user'
import { awsConfig } from '@/infrastructure/aws/config'
import { cognitoConfig } from '@/infrastructure/aws/config/cognito.config'
import { Logger } from '@/infrastructure/utils/Logger'

const logger = Logger.getInstance()

@injectable()
export class UserCognitoService {
  private readonly cognitoIdentityProvider: CognitoIdentityProvider

  private readonly userPoolId: string = awsConfig.cognito.userPoolId
  private readonly clientId: string = awsConfig.cognito.clientId

  constructor() {
    logger.info('----------------------- initializing UserCognitoService -------------------')
    this.cognitoIdentityProvider = new CognitoIdentityProvider({ region: awsConfig.region })
  }

  async createUser(email: string): Promise<void> {
    const command = new AdminCreateUserCommand({
      UserPoolId: cognitoConfig.userPoolId,
      Username: email,
      MessageAction: 'SUPPRESS', // Prevents sending a welcome email
      // TemporaryPassword: password,
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

  async setUserPassword(email: string, password: string): Promise<void> {
    const command = new AdminSetUserPasswordCommand({
      UserPoolId: this.userPoolId,
      Username: email,
      Password: password,
      Permanent: true
    })
    await this.cognitoIdentityProvider.send(command)
  }

  async findUserByEmail(email: string): Promise<AuthUser | null> {
    const command = new ListUsersCommand({
      UserPoolId: this.userPoolId,
      Filter: `email = "${email}"`
    })

    const response = await this.cognitoIdentityProvider.send(command)
    const user = response.Users?.[0]

    if (!user) return null

    return new AuthUser(user.Username, user.Attributes?.find((attr) => attr.Name === 'email')?.Value || '')
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
    } else if (!response.AuthenticationResult.AccessToken) {
      throw new Error('AccessToken is missing from the AuthenticationResult.')
    }

    return new AuthSuccessResult(response.AuthenticationResult?.AccessToken || '')
  }

  async delete(email: string): Promise<void> {
    const command = new AdminDeleteUserCommand({
      UserPoolId: this.userPoolId,
      Username: email
    })

    await this.cognitoIdentityProvider.send(command)
  }
}

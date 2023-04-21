import { varToString } from '../utilities'

export const createUserPool = () => {
  const userPool = {
    Type: 'AWS::Cognito::UserPool',
    Properties: {
      UserPoolName: '${self:service}-${sls:stage}-user-pool',
      Schema: [
        {
          Name: 'email',
          Required: true,
          Mutable: true
        }
      ],
      AutoVerifiedAttributes: ['email'],
      Policies: {
        PasswordPolicy: {
          MinimumLength: 8,
          RequireLowercase: true,
          RequireNumbers: true,
          RequireSymbols: false,
          RequireUppercase: true
        }
      },
      MfaConfiguration: 'OFF'
    }
  }

  const userPoolClient = {
    Type: 'AWS::Cognito::UserPoolClient',
    Properties: {
      ClientName: '${self:service}-${sls:stage}-api-client',
      UserPoolId: { Ref: 'userPool' },
      ExplicitAuthFlows: [
        'ALLOW_USER_PASSWORD_AUTH',
        'ALLOW_REFRESH_TOKEN_AUTH'
      ],
      GenerateSecret: false
    }
  }

  return {
    resources: {
      userPool,
      userPoolClient
    },
    userPoolId: { Ref: varToString({ userPool }) },
    userPoolArn: { 'Fn::GetAtt': [varToString({ userPool }), 'Arn'] },
    userPoolClientId: { Ref: varToString({ userPoolClient }) }
  }
}

import { varToString, withPrefix } from '../../utilities'

export const createUserPool = () : any => {
  const UserPoolName = withPrefix('user-pool')
  const UserPool = {
    Type: 'AWS::Cognito::UserPool',
    Properties: {
      UserPoolName,
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

  const UserPoolClient = {
    Type: 'AWS::Cognito::UserPoolClient',
    Properties: {
      ClientName: withPrefix('api-client'),
      UserPoolId: { Ref: varToString({ UserPool }) },
      ExplicitAuthFlows: [
        'ALLOW_USER_PASSWORD_AUTH',
        'ALLOW_REFRESH_TOKEN_AUTH'
      ],
      GenerateSecret: false
    }
  }

  return {
    resources: {
      UserPool,
      UserPoolClient
    },
    outputs: {
      UserPoolId: {
        Value: { Ref: varToString({ UserPool }) },
        Export: {
          Name: `${UserPoolName}-UserPoolId`
        }
      }
    },
    UserPoolId: { Ref: varToString({ UserPool }) },
    UserPoolArn: { 'Fn::GetAtt': [varToString({ UserPool }), 'Arn'] },
    UserPoolClientId: { Ref: varToString({ UserPoolClient }) }
  }
}

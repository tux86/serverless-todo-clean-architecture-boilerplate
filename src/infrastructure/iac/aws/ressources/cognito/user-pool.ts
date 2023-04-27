import { generatePrefixedResourceName, generatePrefixedSsmParameterName, varToString } from '../../utils/common.util'

export const cognitoUserPool = (): any => {
  const UserPoolName = generatePrefixedResourceName('user-pool')
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

  const UserPoolIdParameter = {
    Type: 'AWS::SSM::Parameter',
    Properties: {
      Name: generatePrefixedSsmParameterName('cognito/userPoolId'),
      Type: 'String',
      Value: { Ref: varToString({ UserPool }) }
    }
  }

  const UserPoolClient = {
    Type: 'AWS::Cognito::UserPoolClient',
    Properties: {
      ClientName: generatePrefixedResourceName('api-client'),
      UserPoolId: { Ref: varToString({ UserPool }) },
      ExplicitAuthFlows: ['ALLOW_ADMIN_USER_PASSWORD_AUTH', 'ALLOW_USER_PASSWORD_AUTH', 'ALLOW_REFRESH_TOKEN_AUTH'],
      GenerateSecret: false,
      TokenValidityUnits: {
        AccessToken: 'hours',
        IdToken: 'hours',
        RefreshToken: 'hours'
      },
      AccessTokenValidity: 24,
      IdTokenValidity: 24,
      RefreshTokenValidity: 72
    }
  }

  const UserPoolClientIdParameter = {
    Type: 'AWS::SSM::Parameter',
    Properties: {
      Name: generatePrefixedSsmParameterName('cognito/userPoolClientId'),
      Type: 'String',
      Value: { Ref: varToString({ UserPoolClient }) }
    }
  }

  return {
    resources: {
      UserPool,
      UserPoolIdParameter,
      UserPoolClientIdParameter,
      UserPoolClient
    },
    outputs: {
      UserPoolId: {
        Value: { Ref: varToString({ UserPool }) },
        Export: {
          Name: `${UserPoolName}-UserPoolId`
        }
      },
      UserPoolClientId: {
        Value: { Ref: varToString({ UserPoolClient }) },
        Export: {
          Name: `${UserPoolName}-UserPoolClientId`
        }
      }
    },
    UserPoolName,
    UserPoolId: { Ref: varToString({ UserPool }) },
    UserPoolArn: { 'Fn::GetAtt': [varToString({ UserPool }), 'Arn'] },
    UserPoolClientId: { Ref: varToString({ UserPoolClient }) }
  }
}

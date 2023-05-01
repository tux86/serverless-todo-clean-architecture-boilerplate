import {
  generatePrefixedResourceName,
  generatePrefixedSsmParameterName,
  varToString
} from '../../common/src/serverless'
import { AWSResource, AWSResourceSet } from '../../common/src/serverless/types'

export const cognitoUserPool = (): AWSResourceSet => {
  const UserPoolName = generatePrefixedResourceName('user-pool')
  const UserPool: AWSResource = {
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

  const UserPoolIdParameter: AWSResource = {
    Type: 'AWS::SSM::Parameter',
    Properties: {
      Name: generatePrefixedSsmParameterName('cognito/userPoolId'),
      Type: 'String',
      Value: { Ref: varToString({ UserPool }) }
    }
  }

  const UserPoolClient: AWSResource = {
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

  const UserPoolClientIdParameter: AWSResource = {
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
      userPoolName: {
        Value: UserPoolName,
        Export: {
          Name: `${UserPoolName}-userPoolName`
        }
      },
      userPoolId: {
        Value: { Ref: varToString({ UserPool }) },
        Export: {
          Name: `${UserPoolName}-userPoolId`
        }
      },
      userPoolArn: {
        Value: { 'Fn::GetAtt': [varToString({ UserPool }), 'Arn'] },
        Export: {
          Name: `${UserPoolName}-userPoolArn`
        }
      },
      appClientId: {
        Value: { Ref: varToString({ UserPoolClient }) },
        Export: {
          Name: `${UserPoolName}-appClientId`
        }
      }
    }
  }
}

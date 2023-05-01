import { generatePrefixedResourceName, varToString } from '../../../../common/src/aws/helpers'
import { AWSOutputs, AWSResource } from '../../../../common/src/aws/types'

export const userPoolName = generatePrefixedResourceName('user-pool')
export const UserPool: AWSResource = {
  Type: 'AWS::Cognito::UserPool',
  Properties: {
    UserPoolName: userPoolName,
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

export const UserPoolClient: AWSResource = {
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


export const UserPoolOutputs: AWSOutputs = {

  userPoolName: {
    Value: userPoolName,
    Export: {
      Name: `${userPoolName}-userPoolName`
    }
  },
  userPoolId: {
    Value: { Ref: varToString({ UserPool }) },
    Export: {
      Name: `${userPoolName}-userPoolId`
    }
  },
  userPoolArn: {
    Value: { 'Fn::GetAtt': [varToString({ UserPool }), 'Arn'] },
    Export: {
      Name: `${userPoolName}-userPoolArn`
    }
  },
  appClientId: {
    Value: { Ref: varToString({ UserPoolClient }) },
    Export: {
      Name: `${userPoolName}-appClientId`
    }
  }

}


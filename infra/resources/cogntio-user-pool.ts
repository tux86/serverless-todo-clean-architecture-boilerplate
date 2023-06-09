import { generatePrefixedResourceName, varToString } from '../../common/src/iac/serverless/helpers'
import { AWSOutputs, AWSResource } from '../../common/src/iac/serverless/types'

export const userPoolName = generatePrefixedResourceName('user-pool')
export const UserPool: AWSResource = {
  Type: 'AWS::Cognito::UserPool',
  Properties: {
    UserPoolName: userPoolName,
    AdminCreateUserConfig: {
      AllowAdminCreateUserOnly: true
    },
    Schema: [
      {
        Name: 'email',
        Required: true,
        Mutable: true
      }
    ],
    AutoVerifiedAttributes: ['email'],
    UsernameAttributes: ['email'],
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


export const AppClient: AWSResource = {
  Type: 'AWS::Cognito::UserPoolClient',
  Properties: {
    ClientName: generatePrefixedResourceName('api-client'),
    UserPoolId: { Ref: varToString({ UserPool }) },
    ReadAttributes: ['email'],
    ExplicitAuthFlows: ['ALLOW_ADMIN_USER_PASSWORD_AUTH', 'ALLOW_CUSTOM_AUTH', 'ALLOW_REFRESH_TOKEN_AUTH'],
    GenerateSecret: false,
    TokenValidityUnits: {
      AccessToken: 'hours',
      IdToken: 'hours',
      RefreshToken: 'days'
    },
    AccessTokenValidity: '${env:ACCESS_TOKEN_VALIDITY}',
    IdTokenValidity: '${env:ID_TOKEN_VALIDITY}',
    RefreshTokenValidity: '${env:REFRESH_TOKEN_VALIDITY}'
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
    Value: { Ref: varToString({ AppClient }) },
    Export: {
      Name: `${userPoolName}-appClientId`
    }
  }
}


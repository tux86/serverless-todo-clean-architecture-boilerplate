export const CognitoUserPoolClient = {
  Type: 'AWS::Cognito::UserPoolClient',
  Properties: {
    ClientName: '${env:COGNITO_APP_CLIENT_NAME}',
    UserPoolId: { Ref: 'CognitoUserPool' },
    ExplicitAuthFlows: [
      'ALLOW_USER_PASSWORD_AUTH',
      'ALLOW_REFRESH_TOKEN_AUTH'
    ],
    GenerateSecret: false
  }
}

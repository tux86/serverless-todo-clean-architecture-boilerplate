export const CognitoUserPool = {
  Type: 'AWS::Cognito::UserPool',
  Properties: {
    UserPoolName: '${env:COGNITO_USER_POOL_NAME}',
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

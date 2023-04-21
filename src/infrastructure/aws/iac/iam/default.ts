export const defaultIam = {
  role: {

    statements: [
      // dynamodb table
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:DescribeTable',
          'dynamodb:Query',
          'dynamodb:Scan',
          'dynamodb:GetItem',
          'dynamodb:PutItem',
          'dynamodb:UpdateItem',
          'dynamodb:DeleteItem'
        ],
        Resource: [
          {
            'Fn::GetAtt': ['TodosTable', 'Arn']
          }
        ]
      },
      // cognito user pool
      {
        Effect: 'Allow',
        Action: ['cognito-idp:*'],
        Resource: {
          'Fn::GetAtt': ['CognitoUserPool', 'Arn']
        }
      }
    ]
  }
}

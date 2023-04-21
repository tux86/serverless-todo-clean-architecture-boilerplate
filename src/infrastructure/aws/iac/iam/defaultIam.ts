import { AwsArn } from '@serverless/typescript'

export const createDefaultIam = (config: {
  userPoolArn :AwsArn,
  tableArn: AwsArn
}) => {
  return {
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
            config.tableArn
          ]
        },
        // cognito user pool
        {
          Effect: 'Allow',
          Action: ['cognito-idp:*'],
          Resource: config.userPoolArn
        }
      ]
    }
  }
}

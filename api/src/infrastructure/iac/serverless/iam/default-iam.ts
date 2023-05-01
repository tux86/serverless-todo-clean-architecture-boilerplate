import { AWSIam } from '@/common/aws/types'

export const defaultIam = (): AWSIam => {
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
          Resource: ['${param:todosTableArn}', '${param:usersTableArn}']
        },
        // cognito user pool
        {
          Effect: 'Allow',
          Action: ['cognito-idp:*'],
          Resource: '${param:userPoolArn}'
        }
      ]
    }
  }
}

import { todosTable, userPool } from '@/infra/iac/ressources'

export const createDefaultIam = () : any => {
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
            todosTable.tableArn
          ]
        },
        // cognito user pool
        {
          Effect: 'Allow',
          Action: ['cognito-idp:*'],
          Resource: userPool.userPoolArn
        }
      ]
    }
  }
}

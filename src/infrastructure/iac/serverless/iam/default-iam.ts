import { todosTable, userPool } from '@/infrastructure/iac/serverless/ressources'
import { AWSIam } from '@/infrastructure/iac/serverless/types'

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
          Resource: [todosTable.vars.TableArn]
        },
        // cognito user pool
        {
          Effect: 'Allow',
          Action: ['cognito-idp:*'],
          Resource: userPool.vars.UserPoolArn
        }
      ]
    }
  }
}

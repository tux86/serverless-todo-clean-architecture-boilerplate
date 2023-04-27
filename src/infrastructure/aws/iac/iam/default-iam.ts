import { AWS } from '@serverless/typescript'

import { todosTable, userPool } from '@/infrastructure/aws/iac/ressources'

export const defaultIam = (): AWS['provider']['iam'] => {
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
          Resource: [todosTable.TableArn]
        },
        // cognito user pool
        {
          Effect: 'Allow',
          Action: ['cognito-idp:*'],
          Resource: userPool.UserPoolArn
        }
      ]
    }
  }
}
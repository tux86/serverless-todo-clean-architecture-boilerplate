import { AWSResourceSet } from '@/infrastructure/iac/serverless/types'

import { generatePrefixedResourceName, varToString } from '../../utils/common.util'

export const dynamodbTodosTable = (): AWSResourceSet => {
  const TableName = generatePrefixedResourceName('todos')
  const TodosTable = {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName,
      AttributeDefinitions: [
        {
          AttributeName: 'todoId',
          AttributeType: 'S'
        }
      ],
      KeySchema: [
        {
          AttributeName: 'todoId',
          KeyType: 'HASH'
        }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
      }
    }
  }

  return {
    resources: {
      TodosTable
    },
    vars: {
      TableName,
      TableArn: { 'Fn::GetAtt': [varToString({ TodosTable }), 'Arn'] }
    }
  }
}

import { AWSResourceSet } from '@/infrastructure/serverless/utils/types'

import { generatePrefixedResourceName, varToString } from '../../utils'

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
    outputs: {
      todosTableName: {
        Value: TableName,
        Export: {
          Name: `${TableName}-tableName`
        }
      },
      todosTableArn: {
        Value: { 'Fn::GetAtt': [varToString({ TodosTable }), 'Arn'] },
        Export: {
          Name: `${TableName}-tableArn`
        }
      }
    }
  }
}

import { AWS } from '@serverless/typescript'

import { varToString, generatePrefixedResourceName } from '../../utilities'

export const createTodosTable = () : any => {
  const TableName = generatePrefixedResourceName('todos')
  const TodosTable = {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName,
      AttributeDefinitions: [{
        AttributeName: 'todoId',
        AttributeType: 'S'
      }],
      KeySchema: [{
        AttributeName: 'todoId',
        KeyType: 'HASH'
      }],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
      }
    }
  }

  return {
    resources: {
      TodosTable
    } as AWS['resources'],
    TableName,
    TableArn: { 'Fn::GetAtt': [varToString({ TodosTable }), 'Arn'] }
  }
}

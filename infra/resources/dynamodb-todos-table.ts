import { generatePrefixedResourceName, varToString } from '../../common/src/iac/serverless/helpers'
import { AWSOutputs, AWSResource } from '../../common/src/iac/serverless/types'

const tableName = generatePrefixedResourceName('todos')
export const TodosTable: AWSResource = {
  Type: 'AWS::DynamoDB::Table',
  Properties: {
    TableName: tableName,
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


export const TodosTableOutputs: AWSOutputs = {
  todosTableName: {
    Value: tableName,
    Export: {
      Name: `${tableName}-tableName`
    }
  },
  todosTableArn: {
    Value: { 'Fn::GetAtt': [varToString({ TodosTable }), 'Arn'] },
    Export: {
      Name: `${tableName}-tableArn`
    }
  }
}

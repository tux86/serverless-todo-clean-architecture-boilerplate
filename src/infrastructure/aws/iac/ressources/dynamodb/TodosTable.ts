export const TodosTable = {
  Type: 'AWS::DynamoDB::Table',
  Properties: {
    TableName: '${env:DYNAMODB_TABLE}',
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

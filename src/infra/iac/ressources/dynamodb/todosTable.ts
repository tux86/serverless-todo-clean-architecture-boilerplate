import { varToString, withPrefix } from '../../utilities'

export const createTodosTable = () : any => {
  const tableName = withPrefix('todos')
  const todosTable = {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName: tableName,
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
      todosTable
    },
    tableName,
    tableArn: { 'Fn::GetAtt': [varToString({ todosTable }), 'Arn'] }
  }
}

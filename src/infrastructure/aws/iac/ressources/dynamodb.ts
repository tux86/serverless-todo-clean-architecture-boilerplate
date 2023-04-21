import { varToString } from '../../../utils/awsServerless'

export const createTodoDynamodbTable = () => {
  const todosTable = {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName: '${self:service}-${sls:stage}-todos',
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
    tableName: { Ref: varToString({ todosTable }) },
    tableArn: { 'Fn::GetAtt': [varToString({ todosTable }), 'Arn'] }
  }
}

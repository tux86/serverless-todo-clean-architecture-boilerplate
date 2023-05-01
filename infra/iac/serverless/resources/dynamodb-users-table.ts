import { generatePrefixedResourceName, varToString } from '../../../../common/src/aws/helpers'
import { AWSOutputs } from '../../../../common/src/aws/types'

export const tableName = generatePrefixedResourceName('users')
export const UsersTable = {
  Type: 'AWS::DynamoDB::Table',
  Properties: {
    TableName: tableName,
    AttributeDefinitions: [
      {
        AttributeName: 'userId',
        AttributeType: 'S'
      },
      {
        AttributeName: 'email',
        AttributeType: 'S'
      }
    ],
    KeySchema: [
      {
        AttributeName: 'userId',
        KeyType: 'HASH'
      }
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'EmailIndex',
        KeySchema: [
          {
            AttributeName: 'email',
            KeyType: 'HASH'
          }
        ],
        Projection: {
          ProjectionType: 'ALL'
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1
        }
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    },
    StreamSpecification: {
      StreamViewType: 'NEW_AND_OLD_IMAGES'
    }
  }
}
export const UsersTableOutputs: AWSOutputs = {
  usersTableName: {
    Value: tableName,
    Export: {
      Name: `${tableName}-tableName`
    }
  },
  usersTableArn: {
    Value: { 'Fn::GetAtt': [varToString({ UsersTable }), 'Arn'] },
    Export: {
      Name: `${tableName}-tableArn`
    }
  },
  usersTableStreamArn: {
    Value: { 'Fn::GetAtt': [varToString({ UsersTable }), 'StreamArn'] },
    Export: {
      Name: `${tableName}-streamArn`
    }
  }
}

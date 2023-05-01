import { generatePrefixedResourceName, varToString } from '../../common/src/aws'
import { AWSResourceSet } from '../../common/src/aws/types'

export const dynamodbUsersTable = (): AWSResourceSet => {
  const TableName = generatePrefixedResourceName('users')
  const UsersTable = {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName,
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

  return {
    resources: {
      UsersTable
    },
    outputs: {
      usersTableName: {
        Value: TableName,
        Export: {
          Name: `${TableName}-tableName`
        }
      },
      usersTableArn: {
        Value: { 'Fn::GetAtt': [varToString({ UsersTable }), 'Arn'] },
        Export: {
          Name: `${TableName}-tableArn`
        }
      },
      usersTableStreamArn: {
        Value: { 'Fn::GetAtt': [varToString({ UsersTable }), 'StreamArn'] },
        Export: {
          Name: `${TableName}-streamArn`
        }
      }
    }
  }
}

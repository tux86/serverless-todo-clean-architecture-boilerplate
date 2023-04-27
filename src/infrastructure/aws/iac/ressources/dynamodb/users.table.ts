import { AWS } from '@serverless/typescript'

import { generatePrefixedResourceName, varToString } from '../../utils/common.util'

export const dynamodbUsersTable = (): any => {
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
    } as AWS['resources'],
    TableName,
    TableArn: { 'Fn::GetAtt': [varToString({ UsersTable }), 'Arn'] },
    StreamArn: { 'Fn::GetAtt': [varToString({ UsersTable }), 'StreamArn'] }
  }
}
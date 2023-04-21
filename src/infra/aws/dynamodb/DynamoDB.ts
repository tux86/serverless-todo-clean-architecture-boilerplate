import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'

export const dynamoDBClient = new DynamoDBClient({
  region: process.env.AWS_REGION
})

export const dynamoDBDocumentClient = DynamoDBDocumentClient.from(dynamoDBClient, {
  marshallOptions: {
    convertClassInstanceToMap: true,
    removeUndefinedValues: true
  }
})

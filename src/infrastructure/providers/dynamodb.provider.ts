import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import { injectable } from 'inversify'

@injectable()
export class DynamodbClientProvider {
  readonly documentClient: DynamoDBDocumentClient

  constructor() {
    const dynamodbProvider = new DynamoDBClient({
      region: process.env.AWS_REGION
    })
    this.documentClient = DynamoDBDocumentClient.from(dynamodbProvider, {
      marshallOptions: {
        convertClassInstanceToMap: true,
        removeUndefinedValues: true
      }
    })
  }
}

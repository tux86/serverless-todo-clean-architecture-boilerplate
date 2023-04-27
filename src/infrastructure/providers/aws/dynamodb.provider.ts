import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import { injectable } from 'inversify'

import { Logger } from '@/infrastructure/helpers/Logger'

const logger = Logger.getInstance()

@injectable()
export class DynamodbClientProvider {
  readonly documentClient: DynamoDBDocumentClient

  constructor() {
    const dynamodbProvider = new DynamoDBClient({
      region: process.env.AWS_REGION
    })
    logger.info('----------------------- initializing DynamodbClientProvider -------------------')
    this.documentClient = DynamoDBDocumentClient.from(dynamodbProvider, {
      marshallOptions: {
        convertClassInstanceToMap: true,
        removeUndefinedValues: true
      }
    })
  }
}

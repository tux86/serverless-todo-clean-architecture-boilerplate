import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const dynamoDBClient = new DynamoDBClient({
    region:  process.env.AWS_REGION,
});

export default dynamoDBClient;

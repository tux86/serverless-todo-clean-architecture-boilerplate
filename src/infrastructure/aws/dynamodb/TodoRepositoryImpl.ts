import { DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb'

import { dynamoDBClient } from './DynamoDB'
import { Todo } from '../../../domain/entities/Todo'
import { Repository } from '../../../domain/interfaces/Repository'

const documentClient = DynamoDBDocumentClient.from(dynamoDBClient, { marshallOptions: { convertClassInstanceToMap: true, removeUndefinedValues: true } })

export class TodoRepositoryImpl implements Repository<Todo> {
  private tableName = process.env.DYNAMODB_TABLE

  async create (todo: Todo): Promise<Todo> {
    const params = {
      TableName: this.userPoolId,
      Item: todo
    }

    await documentClient.send(new PutCommand(params))
    return todo
  }

  async findById (id: string): Promise<Todo | null> {
    const params = {
      TableName: this.userPoolId,
      Key: { id }
    }

    const result = await documentClient.send(new GetCommand(params))
    return result.Item as Todo || null
  }

  async findAll (): Promise<Todo[]> {
    const params = {
      TableName: this.userPoolId
    }

    const result = await documentClient.send(new ScanCommand(params))
    return result.Items as Todo[] || []
  }

  async update (todo: Todo): Promise<Todo> {
    const params = {
      TableName: this.userPoolId,
      Key: { todoId: todo.todoId },
      UpdateExpression: 'set title = :title, description = :description, userId = :userId, status = :status',
      ExpressionAttributeValues: {
        ':title': todo.title,
        ':description': todo.description,
        ':userId': todo.userId,
        ':status': todo.status
      },
      ReturnValues: 'ALL_NEW'
    }

    const result = await documentClient.send(new UpdateCommand(params))
    return result.Attributes as Todo
  }

  async delete (id: string): Promise<void> {
    const params = {
      TableName: this.userPoolId,
      Key: { id }
    }

    await documentClient.send(new DeleteCommand(params))
  }
}

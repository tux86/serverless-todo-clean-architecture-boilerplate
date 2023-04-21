import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
  UpdateCommand
} from '@aws-sdk/lib-dynamodb'

import { Todo } from '@/domain/entities/Todo'
import { Repository } from '@/domain/interfaces/Repository'
import { dynamoDBDocumentClient } from '@/infrastructure/aws/dynamodb/DynamoDB'
import { Config } from '@/infrastructure/Config'

export class TodoRepositoryImpl implements Repository<Todo> {
  private readonly tableName :string

  private readonly documentClient: DynamoDBDocumentClient
  constructor (readonly config: Config) {
    this.tableName = this.config.todosTable
    this.documentClient = dynamoDBDocumentClient
  }

  async create (todo: Todo): Promise<Todo> {
    const params = {
      TableName: this.tableName,
      Item: todo
    }

    await this.documentClient.send(new PutCommand(params))
    return todo
  }

  async findById (id: string): Promise<Todo | null> {
    const params = {
      TableName: this.tableName,
      Key: { id }
    }

    const result = await this.documentClient.send(new GetCommand(params))
    return result.Item as Todo || null
  }

  async findAll (): Promise<Todo[]> {
    const params = {
      TableName: this.tableName
    }

    const result = await this.documentClient.send(new ScanCommand(params))
    return result.Items as Todo[] || []
  }

  async update (todo: Todo): Promise<Todo> {
    const params = {
      TableName: this.tableName,
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

    const result = await this.documentClient.send(new UpdateCommand(params))
    return result.Attributes as Todo
  }

  async delete (id: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: { id }
    }

    await this.documentClient.send(new DeleteCommand(params))
  }
}

import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand, PutCommandInput,
  ScanCommand,
  UpdateCommand
} from '@aws-sdk/lib-dynamodb'

import { Todo } from '@/domain/entities/Todo'
import { Repository } from '@/domain/repositories/Repository'
import { TodoAdapter } from '@/infra/adapaters/TodoAdapter'
import { dynamoDBDocumentClient } from '@/infra/clients/dynamodb'
import { TodoEntity } from '@/infra/entities/TodoEntity'
import { Mapper } from '@/infra/utils/Mapper'

export class TodoRepositoryImpl implements Repository<Todo> {
  private readonly documentClient: DynamoDBDocumentClient
  constructor (readonly tableName: string) {
    this.tableName = tableName
    this.documentClient = dynamoDBDocumentClient
  }

  async create (todo: Todo): Promise<Todo> {
    const todoModel = Mapper.toPersistenceModel(todo, TodoAdapter.toPersistenceModel)
    const params : PutCommandInput = {
      TableName: this.tableName,
      Item: todoModel
    }

    await this.documentClient.send(new PutCommand(params))

    return todo
  }

  async findById (todoId: string): Promise<Todo | null> {
    const params = {
      TableName: this.tableName,
      Key: { todoId }
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

  async update (todo: Partial<Todo>): Promise<Todo> {
    const todoModel = Mapper.toPersistenceModel(todo, TodoAdapter.toPersistenceModel)
    const params = {
      TableName: this.tableName,
      Key: { todoId: todoModel.todoId },
      UpdateExpression: 'set title = :title, description = :description, userId = :userId, status = :status',
      ExpressionAttributeValues: {
        ':title': todoModel.title,
        ':description': todoModel.description,
        ':userId': todoModel.userId,
        ':status': todoModel.status
      },
      ReturnValues: 'ALL_NEW'
    }

    const result = await this.documentClient.send(new UpdateCommand(params))

    return TodoAdapter.toDomainEntity(result.Attributes as TodoEntity)
  }

  async delete (todoId: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: { todoId }
    }

    await this.documentClient.send(new DeleteCommand(params))
  }
}

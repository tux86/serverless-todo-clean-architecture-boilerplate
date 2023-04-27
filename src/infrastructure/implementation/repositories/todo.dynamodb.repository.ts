import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  PutCommandInput,
  ScanCommand,
  UpdateCommand
} from '@aws-sdk/lib-dynamodb'

import { Todo } from '@/domain/models/todo'
import { Repository } from '@/domain/repositories/repository'
import { uuidV4 } from '@/domain/utils/uuid-generator'
import { Mapper } from '@/infrastructure/adapaters/entity/mapper'
import { TodoAdapter } from '@/infrastructure/adapaters/entity/todo.adapter'
import { TodoEntity } from '@/infrastructure/entities/todo.entity'
import { dynamoDBDocumentClient } from '@/infrastructure/providers/aws/dynamodb.provider'

export class TodoDynamodbRepository implements Repository<Todo> {
  private readonly documentClient: DynamoDBDocumentClient

  constructor(readonly tableName: string) {
    this.tableName = tableName
    this.documentClient = dynamoDBDocumentClient
  }

  async create(todo: Todo): Promise<Todo> {
    const todoModel = Mapper.toPersistenceModel(todo, TodoAdapter.toPersistenceModel)
    todoModel.todoId = uuidV4()
    const params: PutCommandInput = {
      TableName: this.tableName,
      Item: todoModel
    }
    await this.documentClient.send(new PutCommand(params))
    return Mapper.toDomainEntity(todoModel, TodoAdapter.toDomainEntity)
  }

  async findById(todoId: string): Promise<Todo | null> {
    const params = {
      TableName: this.tableName,
      Key: { todoId }
    }

    const result = await this.documentClient.send(new GetCommand(params))
    return (result.Item as Todo) || null
  }

  async findAll(): Promise<Todo[]> {
    const params = {
      TableName: this.tableName
    }

    const result = await this.documentClient.send(new ScanCommand(params))
    return (result.Items as Todo[]) || []
  }

  async update(todo: Partial<Todo>): Promise<Todo> {
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

  async delete(todoId: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: { todoId }
    }

    await this.documentClient.send(new DeleteCommand(params))
  }
}

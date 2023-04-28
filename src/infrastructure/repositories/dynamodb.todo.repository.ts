import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  PutCommandInput,
  ScanCommand,
  UpdateCommand
} from '@aws-sdk/lib-dynamodb'
import { inject, injectable } from 'inversify'

import { uuidV4 } from '@/common/utils/uuid-generator'
import { Todo } from '@/domain/models/todo'
import { Repository } from '@/domain/repositories/repository'
import { Mapper } from '@/infrastructure/adapaters/model/mapper'
import { TodoAdapter } from '@/infrastructure/adapaters/model/todo.adapter'
import { TodoEntity } from '@/infrastructure/entities/todo.entity'
import { DynamodbClientProvider } from '@/infrastructure/providers/dynamodb.provider'

@injectable()
export class DynamodbTodoRepository implements Repository<Todo> {
  private readonly tableName: string
  private readonly docClient: DynamoDBDocumentClient

  constructor(@inject(DynamodbClientProvider) readonly dynamodbClientProvider: DynamodbClientProvider) {
    this.tableName = process.env.TODOS_TABLE
    console.log(process.env.TODOS_TABLE)
    this.docClient = dynamodbClientProvider.documentClient
  }

  async create(todo: Todo): Promise<Todo> {
    const todoModel = Mapper.toPersistenceModel(todo, TodoAdapter.toPersistenceModel)
    todoModel.todoId = uuidV4()
    const params: PutCommandInput = {
      TableName: this.tableName,
      Item: todoModel
    }
    await this.docClient.send(new PutCommand(params))
    return Mapper.toDomainEntity(todoModel, TodoAdapter.toDomainEntity)
  }

  async findById(todoId: string): Promise<Todo | null> {
    const params = {
      TableName: this.tableName,
      Key: { todoId }
    }

    const result = await this.docClient.send(new GetCommand(params))
    return (result.Item as Todo) || null
  }

  async findAll(): Promise<Todo[]> {
    const params = {
      TableName: this.tableName
    }

    const result = await this.docClient.send(new ScanCommand(params))
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

    const result = await this.docClient.send(new UpdateCommand(params))

    return TodoAdapter.toDomainEntity(result.Attributes as TodoEntity)
  }

  async delete(todoId: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: { todoId }
    }

    await this.docClient.send(new DeleteCommand(params))
  }
}

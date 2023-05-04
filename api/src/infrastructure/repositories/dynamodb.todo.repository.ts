import {
  DeleteCommand,
  DeleteCommandInput,
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
  PutCommand,
  PutCommandInput,
  ScanCommand,
  ScanCommandInput,
  UpdateCommand,
  UpdateCommandInput
} from '@aws-sdk/lib-dynamodb'

import { Todo } from '@/api/domain/models/todo'
import { TodoRepository } from '@/api/domain/repositories/todo.repository'

import { AWS_CONFIG } from '../config'
import { TodoEntity } from '../entities/todo.entity'
import { TodoEntityMapper } from '../mappers/todo-entity.mapper'
import { DynamodbClientProvider } from '../providers/dynamodb.provider'

export class DynamodbTodoRepository implements TodoRepository {
  private readonly tableName: string
  private readonly docClient: DynamoDBDocumentClient

  constructor(readonly dynamodbClientProvider: DynamodbClientProvider, readonly mapper: TodoEntityMapper) {
    this.tableName = AWS_CONFIG.dynamodb.todosTable.name
    this.docClient = dynamodbClientProvider.documentClient
  }

  async create(todo: Todo): Promise<Todo> {
    const todoEntity = this.mapper.toPersistenceEntity(todo)

    const params: PutCommandInput = {
      TableName: this.tableName,
      Item: todoEntity
    }
    await this.docClient.send(new PutCommand(params))
    return this.mapper.toDomainModel(todoEntity)
  }

  async findById(todoId: string): Promise<Todo | null> {
    const params: GetCommandInput = {
      TableName: this.tableName,
      Key: { todoId }
    }

    const result = await this.docClient.send(new GetCommand(params))
    return result.Item ? this.mapper.toDomainModel(result.Item) : null
  }

  async findByUserId(userId: string): Promise<Todo[]> {
    const params: ScanCommandInput = {
      TableName: this.tableName,
      FilterExpression: 'userId = :userId',
      ExpressionAttributeValues: { ':userId': userId }
    }

    const result = await this.docClient.send(new ScanCommand(params))
    return result.Items ? result.Items.map((item) => this.mapper.toDomainModel(item)) : []
  }

  async findAll(): Promise<Todo[]> {
    const params: ScanCommandInput = {
      TableName: this.tableName
    }

    const result = await this.docClient.send(new ScanCommand(params))
    return result.Items ? result.Items.map((item) => this.mapper.toDomainModel(item)) : []
  }

  async update(todo: Partial<Todo>): Promise<Todo> {
    const todoEntity = this.mapper.toPersistenceEntity(todo)

    const updateExpressionParts: string[] = []
    const expressionAttributeNames: { [key: string]: string } = {}
    const expressionAttributeValues: { [key: string]: any } = {}

    if (todoEntity.title) {
      updateExpressionParts.push('title = :title')
      expressionAttributeValues[':title'] = todoEntity.title
    }

    if (todoEntity.description) {
      updateExpressionParts.push('description = :description')
      expressionAttributeValues[':description'] = todoEntity.description
    }

    if (todoEntity.userId) {
      updateExpressionParts.push('userId = :userId')
      expressionAttributeValues[':userId'] = todoEntity.userId
    }

    if (todoEntity.status) {
      updateExpressionParts.push('#status_alias = :status')
      expressionAttributeNames['#status_alias'] = 'status'
      expressionAttributeValues[':status'] = todoEntity.status
    }

    updateExpressionParts.push('updatedAt = :updatedAt')
    expressionAttributeValues[':updatedAt'] = todoEntity.updatedAt

    const updateExpression = 'set ' + updateExpressionParts.join(', ')

    const params: UpdateCommandInput = {
      TableName: this.tableName,
      Key: { todoId: todoEntity.todoId },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW'
    }

    if (Object.keys(expressionAttributeNames).length > 0) {
      params.ExpressionAttributeNames = expressionAttributeNames
    }

    const result = await this.docClient.send(new UpdateCommand(params))

    return this.mapper.toDomainModel(result.Attributes as TodoEntity)
  }

  async delete(todoId: string): Promise<void> {
    const params: DeleteCommandInput = {
      TableName: this.tableName,
      Key: { todoId }
    }

    await this.docClient.send(new DeleteCommand(params))
  }
}

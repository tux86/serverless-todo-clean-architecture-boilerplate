import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand, PutCommandInput,
  ScanCommand,
  UpdateCommand
} from '@aws-sdk/lib-dynamodb'

import { Repository } from '@/domain/interfaces/repositories/Repository'
import { Todo } from '@/domain/models/Todo'
import { TodoAdapter } from '@/infra/adapaters/TodoAdapter'
import { dynamoDBDocumentClient } from '@/infra/clients/dynamodb'
import { TodoModel } from '@/infra/models/TodoModel'
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
      TableName: this.TableName,
      Item: todoModel
    }

    await this.documentClient.send(new PutCommand(params))

    return todo
  }

  async findById (id: string): Promise<Todo | null> {
    const params = {
      TableName: this.TableName,
      Key: { id }
    }

    const result = await this.documentClient.send(new GetCommand(params))
    return result.Item as Todo || null
  }

  async findAll (): Promise<Todo[]> {
    const params = {
      TableName: this.TableName
    }

    const result = await this.documentClient.send(new ScanCommand(params))
    return result.Items as Todo[] || []
  }

  async update (todo: Partial<Todo>): Promise<Todo> {
    const todoModel = Mapper.toPersistenceModel(todo, TodoAdapter.toPersistenceModel)
    const params = {
      TableName: this.TableName,
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

    return TodoAdapter.toDomainEntity(result.Attributes as TodoModel)
  }

  async delete (id: string): Promise<void> {
    const params = {
      TableName: this.TableName,
      Key: { id }
    }

    await this.documentClient.send(new DeleteCommand(params))
  }
}

import {
  DeleteCommand,
  DeleteCommandInput,
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
  PutCommand,
  PutCommandInput,
  QueryCommand,
  QueryCommandInput,
  ScanCommand,
  ScanCommandInput,
  UpdateCommand,
  UpdateCommandInput
} from '@aws-sdk/lib-dynamodb'

import { UserAccountAlreadyExists } from '@/api/application/errors'
import { User } from '@/api/domain/models/user'
import { UserRepository } from '@/api/domain/repositories/user.repository'

import { AWS_CONFIG } from '../config'
import { UserEntity } from '../entities/user.entity'
import { UserEntityMapper } from '../mappers/user-entity.mapper'
import { DynamodbClientProvider } from '../providers/dynamodb.provider'

export class DynamodbUserRepository implements UserRepository {
  private readonly tableName: string

  private readonly docClient: DynamoDBDocumentClient

  constructor(readonly dynamodbClientProvider: DynamodbClientProvider, readonly mapper: UserEntityMapper) {
    this.tableName = AWS_CONFIG.dynamodb.usersTable.name
    this.docClient = dynamodbClientProvider.documentClient
  }

  async create(user: User): Promise<User> {
    // TODO optimize this (only update instruction)
    const existingUser = await this.findByEmail(user.email)
    if (existingUser) {
      throw new UserAccountAlreadyExists()
    }

    const userEntity = this.mapper.toPersistenceEntity(user)
    const params: PutCommandInput = {
      TableName: this.tableName,
      Item: userEntity
    }

    await this.docClient.send(new PutCommand(params))

    return user
  }

  async findById(userId: string): Promise<User | null> {
    const params: GetCommandInput = {
      TableName: this.tableName,
      Key: { userId }
    }

    const result = await this.docClient.send(new GetCommand(params))
    return result.Item ? this.mapper.toDomainModel(result.Item as UserEntity) : null
  }

  async findAll(): Promise<User[]> {
    const params: ScanCommandInput = {
      TableName: this.tableName
    }
    const result = await this.docClient.send(new ScanCommand(params))
    return ((result.Items as UserEntity[]) || []).map(this.mapper.toDomainModel)
  }

  async findByEmail(email: string): Promise<User | null> {
    const params: QueryCommandInput = {
      TableName: this.tableName,
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email
      }
    }

    const result = await this.docClient.send(new QueryCommand(params))
    return result.Items && result.Items.length > 0 ? this.mapper.toDomainModel(result.Items[0] as UserEntity) : null
  }

  async update(user: Partial<User>): Promise<User> {
    const userEntity = this.mapper.toPersistenceEntity(user)

    const updateExpressionParts: string[] = []
    const expressionAttributeValues: { [key: string]: any } = {}
    const expressionAttributeNames: { [key: string]: string } = {}

    if (userEntity.firstName) {
      updateExpressionParts.push('#firstName = :firstName')
      expressionAttributeNames['#firstName'] = 'firstName'
      expressionAttributeValues[':firstName'] = userEntity.firstName
    }

    if (userEntity.lastName) {
      updateExpressionParts.push('#lastName = :lastName')
      expressionAttributeNames['#lastName'] = 'lastName'
      expressionAttributeValues[':lastName'] = userEntity.lastName
    }

    if (userEntity.email) {
      updateExpressionParts.push('#email = :email')
      expressionAttributeNames['#email'] = 'email'
      expressionAttributeValues[':email'] = userEntity.email
    }

    if (userEntity.role) {
      updateExpressionParts.push('#role = :role')
      expressionAttributeNames['#role'] = 'role'
      expressionAttributeValues[':role'] = userEntity.role
    }

    if (userEntity.lastLoggedAt) {
      updateExpressionParts.push('#lastLoggedAt = :lastLoggedAt')
      expressionAttributeNames['#lastLoggedAt'] = 'lastLoggedAt'
      expressionAttributeValues[':lastLoggedAt'] = userEntity.lastLoggedAt
    }

    const updateExpression = 'set ' + updateExpressionParts.join(', ')

    const params: UpdateCommandInput = {
      TableName: this.tableName,
      Key: { userId: userEntity.userId },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW'
    }

    const result = await this.docClient.send(new UpdateCommand(params))

    return this.mapper.toDomainModel(result.Attributes as UserEntity)
  }

  async delete(userId: string): Promise<void> {
    const params: DeleteCommandInput = {
      TableName: this.tableName,
      Key: { userId }
    }

    await this.docClient.send(new DeleteCommand(params))
  }
}

import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  PutCommandInput,
  QueryCommand,
  ScanCommand,
  UpdateCommand
} from '@aws-sdk/lib-dynamodb'
import { inject, injectable } from 'inversify'

import { User } from '@/domain/models/user'
import { UserRepository } from '@/domain/repositories/user-repository'
import { uuidV4 } from '@/domain/utils/uuid-generator'
import { Mapper } from '@/infrastructure/aws/adapaters/model/mapper'
import { UserAdapter } from '@/infrastructure/aws/adapaters/model/user.adapter'
import { DynamodbClientProvider } from '@/infrastructure/aws/providers/dynamodb.provider'
import { UserEntity } from '@/infrastructure/entities/user.entity'

@injectable()
export class DynamodbUserRepository implements UserRepository {
  private readonly tableName: string

  private readonly docClient: DynamoDBDocumentClient

  constructor(@inject(DynamodbClientProvider) readonly dynamodbClientProvider: DynamodbClientProvider) {
    this.tableName = process.env.USERS_TABLE
    this.docClient = dynamodbClientProvider.documentClient
  }

  async create(user: User): Promise<User> {
    const userEntity = Mapper.toPersistenceModel(user, UserAdapter.toPersistenceModel)
    userEntity.userId = uuidV4()
    const params: PutCommandInput = {
      TableName: this.tableName,
      Item: userEntity
    }

    await this.docClient.send(new PutCommand(params))

    return user
  }

  async findById(userId: string): Promise<User | null> {
    const params = {
      TableName: this.tableName,
      Key: { userId }
    }

    const result = await this.docClient.send(new GetCommand(params))
    return UserAdapter.toDomainEntity(result.Item as UserEntity) || null
  }

  async findAll(): Promise<User[]> {
    const params = {
      TableName: this.tableName
    }

    const result = await this.docClient.send(new ScanCommand(params))
    return ((result.Items as UserEntity[]) || []).map(UserAdapter.toDomainEntity)
  }

  async findByEmail(email: string): Promise<User | null> {
    const params = {
      TableName: this.tableName,
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email
      }
    }

    const result = await this.docClient.send(new QueryCommand(params))
    return result.Items && result.Items.length > 0 ? UserAdapter.toDomainEntity(result.Items[0] as UserEntity) : null
  }

  async update(user: Partial<User>): Promise<User> {
    const userEntity = Mapper.toPersistenceModel(user, UserAdapter.toPersistenceModel)
    const params = {
      TableName: this.tableName,
      Key: { userId: userEntity.userId },
      UpdateExpression: 'set firstName = :firstName, lastName = :lastName, email = :email',
      ExpressionAttributeValues: {
        ':firstName': userEntity.firstName,
        ':lastName': userEntity.lastName,
        ':email': userEntity.email
      },
      ReturnValues: 'ALL_NEW'
    }

    const result = await this.docClient.send(new UpdateCommand(params))

    return UserAdapter.toDomainEntity(result.Attributes as UserEntity)
  }

  async delete(userId: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: { userId }
    }

    await this.docClient.send(new DeleteCommand(params))
  }
}

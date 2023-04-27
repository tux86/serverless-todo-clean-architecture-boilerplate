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

import { User } from '@/domain/models/user'
import { UserRepository } from '@/domain/repositories/user-repository'
import { uuidV4 } from '@/domain/utils/uuid-generator'
import { Mapper } from '@/infrastructure/adapaters/entity/mapper'
import { UserAdapter } from '@/infrastructure/adapaters/entity/user.adapter'
import { UserEntity } from '@/infrastructure/entities/user.entity'
import { dynamoDBDocumentClient } from '@/infrastructure/providers/aws/dynamodb.provider'

export class UserDynamodbRepository implements UserRepository {
  private readonly documentClient: DynamoDBDocumentClient

  constructor(readonly tableName: string) {
    this.tableName = tableName
    this.documentClient = dynamoDBDocumentClient
  }

  async create(user: User): Promise<User> {
    const userEntity = Mapper.toPersistenceModel(user, UserAdapter.toPersistenceModel)
    userEntity.userId = uuidV4()
    const params: PutCommandInput = {
      TableName: this.tableName,
      Item: userEntity
    }

    await this.documentClient.send(new PutCommand(params))

    return user
  }

  async findById(userId: string): Promise<User | null> {
    const params = {
      TableName: this.tableName,
      Key: { userId }
    }

    const result = await this.documentClient.send(new GetCommand(params))
    return UserAdapter.toDomainEntity(result.Item as UserEntity) || null
  }

  async findAll(): Promise<User[]> {
    const params = {
      TableName: this.tableName
    }

    const result = await this.documentClient.send(new ScanCommand(params))
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

    const result = await this.documentClient.send(new QueryCommand(params))
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

    const result = await this.documentClient.send(new UpdateCommand(params))

    return UserAdapter.toDomainEntity(result.Attributes as UserEntity)
  }

  async delete(userId: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: { userId }
    }

    await this.documentClient.send(new DeleteCommand(params))
  }
}

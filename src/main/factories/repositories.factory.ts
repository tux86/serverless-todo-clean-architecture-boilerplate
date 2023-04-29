import { DynamodbClientProvider } from '@/infrastructure/providers/dynamodb.provider'
import { DynamodbTodoRepository } from '@/infrastructure/repositories/dynamodb.todo.repository'
import { DynamodbUserRepository } from '@/infrastructure/repositories/dynamodb.user.repository'

export const createUserRepository = () => new DynamodbUserRepository(new DynamodbClientProvider())
export const createTodoRepository = () => new DynamodbTodoRepository(new DynamodbClientProvider())

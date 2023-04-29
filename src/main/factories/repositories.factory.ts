import { TodoEntityMapper } from '@/infrastructure/mappers/todo-entity.mapper'
import { UserEntityMapper } from '@/infrastructure/mappers/user-entity.mapper'
import { DynamodbClientProvider } from '@/infrastructure/providers/dynamodb.provider'
import { DynamodbTodoRepository } from '@/infrastructure/repositories/dynamodb.todo.repository'
import { DynamodbUserRepository } from '@/infrastructure/repositories/dynamodb.user.repository'

export const createUserRepository = () =>
  new DynamodbUserRepository(new DynamodbClientProvider(), new UserEntityMapper())
export const createTodoRepository = () =>
  new DynamodbTodoRepository(new DynamodbClientProvider(), new TodoEntityMapper())

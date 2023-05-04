import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator'

import { TodoStatus } from '@/api/domain/models/todo'

export class CreateTodoInput {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  description: string

  @IsNotEmpty()
  @IsUUID()
  userId: string

  @IsOptional()
  @IsEnum(TodoStatus)
  status: TodoStatus
}

import { Type } from 'class-transformer'
import { IsEnum, IsOptional, IsString, IsUUID, MaxLength, ValidateNested } from 'class-validator'

import { RequesterInfo } from '@/api/application/dtos/requester-info.dto'
import { TodoStatus } from '@/api/domain/models/todo'

export class UpdateTodoPayload {
  @IsUUID()
  todoId: string

  @IsOptional()
  @IsString()
  @MaxLength(20)
  title?: string

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string

  @IsOptional()
  @IsEnum(TodoStatus)
  status: TodoStatus
}

export class UpdateTodoInput {
  @ValidateNested()
  @Type(() => RequesterInfo)
  requesterInfo: RequesterInfo

  @ValidateNested()
  @Type(() => UpdateTodoPayload)
  payload: UpdateTodoPayload
}

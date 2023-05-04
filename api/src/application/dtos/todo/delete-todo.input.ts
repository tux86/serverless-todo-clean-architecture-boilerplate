import { Type } from 'class-transformer'
import { IsNotEmpty, IsUUID, ValidateNested } from 'class-validator'

import { RequesterInfo } from '@/api/application/dtos/requester-info.dto'

export class DeleteTodoInput {
  @ValidateNested()
  @Type(() => RequesterInfo)
  requesterInfo: RequesterInfo

  @IsNotEmpty()
  @IsUUID()
  todoId: string
}

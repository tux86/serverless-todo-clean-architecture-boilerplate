import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

import { RequesterInfo } from '@/api/application/dtos/requester-info.dto'

export class ListTodosInput {
  @ValidateNested()
  @Type(() => RequesterInfo)
  requesterInfo: RequesterInfo
}

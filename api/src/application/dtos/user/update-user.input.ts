import { Type } from 'class-transformer'
import { IsOptional, IsString, IsUUID, MaxLength, MinLength, ValidateNested } from 'class-validator'

import { RequesterInfo } from '@/api/application/dtos/requester-info.dto'

export class UpdateUserPayload {
  @IsUUID()
  userId: string

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  firstName?: string

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  lastName?: string
}

export class UpdateUserInput {
  @ValidateNested()
  @Type(() => RequesterInfo)
  requesterInfo: RequesterInfo

  @ValidateNested()
  @Type(() => UpdateUserPayload)
  payload: UpdateUserPayload
}

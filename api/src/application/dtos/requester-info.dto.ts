import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

import { Role } from '@/api/domain/models/user'

export class RequesterInfo {
  @IsNotEmpty()
  @IsUUID()
  userId: string

  @IsNotEmpty()
  @IsString()
  role: Role
}

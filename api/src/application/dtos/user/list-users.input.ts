import { IsNotEmpty } from 'class-validator'

import { Role } from '@/api/domain/models/user'

export class ListUsersInput {
  @IsNotEmpty()
  readonly requestingUserRole: Role

  constructor(props: ListUsersInput) {
    this.requestingUserRole = props.requestingUserRole
  }
}

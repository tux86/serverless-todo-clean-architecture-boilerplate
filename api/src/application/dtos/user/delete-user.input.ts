import { IsNotEmpty, IsUUID } from 'class-validator'

export class DeleteUserInput {
  @IsNotEmpty()
  @IsUUID()
  readonly requestingUserId: string

  @IsNotEmpty()
  @IsUUID()
  readonly userId: string

  constructor(props: DeleteUserInput) {
    this.userId = props.userId
  }
}

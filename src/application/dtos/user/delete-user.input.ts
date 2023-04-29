import { IsNotEmpty, IsUUID } from 'class-validator'

export class DeleteUserInput {
  @IsNotEmpty()
  @IsUUID()
  userId: string

  constructor(props: DeleteUserInput) {
    this.userId = props.userId
  }
}

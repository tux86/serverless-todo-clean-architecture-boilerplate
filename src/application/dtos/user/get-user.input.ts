import { IsNotEmpty, IsUUID } from 'class-validator'

export class GetUserInput {
  @IsNotEmpty()
  @IsUUID()
  userId: string

  constructor(props: GetUserInput) {
    this.userId = props.userId
  }
}

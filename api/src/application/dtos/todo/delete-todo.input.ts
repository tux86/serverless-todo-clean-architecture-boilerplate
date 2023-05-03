import { IsNotEmpty, IsUUID } from 'class-validator'

export class DeleteTodoInput {
  @IsNotEmpty()
  @IsUUID()
  readonly requestingUserId: string

  @IsNotEmpty()
  @IsUUID()
  readonly todoId: string

  constructor(props: DeleteTodoInput) {
    this.requestingUserId = props.requestingUserId
    this.todoId = props.todoId
  }
}

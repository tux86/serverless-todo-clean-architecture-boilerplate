import { IsNotEmpty, IsUUID } from 'class-validator'

export class DeleteTodoInput {
  @IsNotEmpty()
  @IsUUID()
  readonly userId: string

  @IsNotEmpty()
  @IsUUID()
  readonly todoId: string

  constructor(props: DeleteTodoInput) {
    this.userId = props.userId
    this.todoId = props.todoId
  }
}

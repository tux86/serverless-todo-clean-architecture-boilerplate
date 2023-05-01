import { IsNotEmpty, IsUUID } from 'class-validator'

export class DeleteTodoInput {
  @IsNotEmpty()
  @IsUUID()
  readonly todoId: string

  constructor(props: DeleteTodoInput) {
    this.todoId = props.todoId
  }
}

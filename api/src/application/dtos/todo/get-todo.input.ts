import { IsNotEmpty, IsUUID } from 'class-validator'

export class GetTodoInput {
  @IsNotEmpty()
  @IsUUID()
  readonly todoId: string

  constructor(props: GetTodoInput) {
    this.todoId = props.todoId
  }
}

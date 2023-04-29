import { IsNotEmpty, IsUUID } from 'class-validator'

export class GetTodoInput {
  @IsNotEmpty()
  @IsUUID()
  todoId: string

  constructor(props: GetTodoInput) {
    this.todoId = props.todoId
  }
}

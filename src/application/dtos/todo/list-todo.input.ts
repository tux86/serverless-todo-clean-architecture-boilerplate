import { IsNotEmpty, IsUUID } from 'class-validator'

export class ListTodoInput {
  @IsNotEmpty()
  @IsUUID()
  userId: string

  constructor(props: ListTodoInput) {
    this.userId = props.userId
  }
}
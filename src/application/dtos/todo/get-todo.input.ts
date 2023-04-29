import { IsNotEmpty, IsUUID } from 'class-validator'

export class GetTodoInput {
  @IsNotEmpty()
  @IsUUID()
  todoId: string
}

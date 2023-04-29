import { IsNotEmpty, IsUUID } from 'class-validator'

export class DeleteTodoInput {
  @IsNotEmpty()
  @IsUUID()
  todoId: string
}

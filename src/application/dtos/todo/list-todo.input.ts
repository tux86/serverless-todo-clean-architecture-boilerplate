import { IsNotEmpty, IsUUID } from 'class-validator'

export class ListTodoInput {
  @IsNotEmpty()
  @IsUUID()
  userId: string
}

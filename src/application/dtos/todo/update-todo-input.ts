import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator'

export class UpdateTodoInput {
  @IsUUID()
  todoId: string

  @IsOptional()
  @IsString()
  @MaxLength(20)
  title?: string

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string

  @IsOptional()
  @IsString()
  @MaxLength(20)
  status?: string

  constructor(props: UpdateTodoInput) {
    this.todoId = props.todoId
    this.title = props.title
    this.description = props.description
    this.status = props.status
  }
}

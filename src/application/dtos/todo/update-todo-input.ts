import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator'

export class UpdateTodoInput {
  @IsUUID()
  readonly todoId: string

  @IsOptional()
  @IsString()
  @MaxLength(20)
  readonly title?: string

  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly description?: string

  @IsOptional()
  @IsString()
  @MaxLength(20)
  readonly status?: string

  constructor(props: UpdateTodoInput) {
    this.todoId = props.todoId
    this.title = props.title
    this.description = props.description
    this.status = props.status
  }
}

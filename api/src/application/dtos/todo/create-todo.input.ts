import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator'

export class CreateTodoInput {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  readonly title: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  readonly description: string

  @IsNotEmpty()
  @IsUUID()
  readonly userId: string

  @IsOptional()
  @IsString()
  @MaxLength(20)
  readonly status?: string

  constructor(props: CreateTodoInput) {
    this.title = props.title
    this.description = props.description
    this.userId = props.userId
    this.status = props.status
  }
}

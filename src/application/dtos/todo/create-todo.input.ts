import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator'

export class CreateTodoInput {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  description: string

  @IsNotEmpty()
  @IsUUID()
  userId: string

  @IsOptional()
  @IsString()
  @MaxLength(20)
  status?: string

  constructor(props: CreateTodoInput) {
    this.title = props.title
    this.description = props.description
    this.userId = props.userId
    this.status = props.status
  }
}

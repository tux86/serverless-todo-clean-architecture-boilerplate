import { IsNotEmpty, IsString, MaxLength, IsOptional, IsUUID } from 'class-validator'
import { v4 as uuidv4 } from 'uuid'

export class Todo {
    @IsUUID()
      todoId: string

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

    constructor (title: string, description: string, userId: string, status?: string, todoId?: string) {
      this.todoId = todoId || uuidv4()
      this.title = title
      this.description = description
      this.userId = userId
      this.status = status
    }
}

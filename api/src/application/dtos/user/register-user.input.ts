import { AbstractCreateUserInput } from '@/api/application/dtos/user/abstract-create-user.input'

export class RegisterUserInput extends AbstractCreateUserInput {
  constructor(props: RegisterUserInput) {
    super(props)
  }
}

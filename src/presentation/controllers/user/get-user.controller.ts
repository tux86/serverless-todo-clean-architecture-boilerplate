import { Controller } from '@/application/interfaces/controller'
import { Request } from '@/application/interfaces/request'
import { Response } from '@/application/interfaces/response'
import { GetUser } from '@/application/usecases/user/get-user'
import { User } from '@/domain/models/user'
import { SuccessResponse } from '@/presentation/utils/response'

export class GetUserController implements Controller<User | never> {
  constructor(readonly getUser: GetUser) {}

  async handleRequest(request: Request<{ userId: string }>): Promise<Response<User>> {
    const user = await this.getUser.execute(request.params.userId)
    return new SuccessResponse(user)
  }
}

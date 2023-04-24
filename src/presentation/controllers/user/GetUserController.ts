import { Controller } from '@/application/interfaces/Controller'
import { Request } from '@/application/interfaces/Request'
import { Response } from '@/application/interfaces/Response'
import { GetUser } from '@/application/usecases/user/GetUser'
import { User } from '@/domain/models/User'
import { SuccessResponse } from '@/presentation/utils/response'

export class GetUserController implements Controller<User | never> {
  constructor(readonly getUser: GetUser) {}

  async handleRequest(request: Request<{ userId: string }>): Promise<Response<User>> {
    const user = await this.getUser.execute(request.params.userId)
    return new SuccessResponse(user)
  }
}

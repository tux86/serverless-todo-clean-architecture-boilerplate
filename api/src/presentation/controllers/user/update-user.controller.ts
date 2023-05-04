import { WithInterceptor } from '@/api/application/decorators/interceptor.decorator'
import { UpdateUserInput, UpdateUserPayload } from '@/api/application/dtos/user/update-user.input'
import { Controller } from '@/api/application/ports/controller'
import { IHttpRequest } from '@/api/application/ports/http-request'
import { IHttpResponse } from '@/api/application/ports/http-response'
import { UpdateUserUseCase } from '@/api/application/use-cases/user/update-user.use-case'
import { User } from '@/api/domain/models/user'
import { mapHttpAttributesToRequesterInfo } from '@/api/mappers/map-http-attributes-to-requester-info'

import { ErrorInterceptor } from '../../interceptors/error.interceptor'
import { UpdatedHttpResponse } from '../../responses/http-response'

export class UpdateUserController implements Controller<User> {
  constructor(readonly updateUser: UpdateUserUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<UpdateUserPayload, { userId: string }>): Promise<IHttpResponse<User>> {
    const { userId } = request.params
    const input: UpdateUserInput = {
      requesterInfo: mapHttpAttributesToRequesterInfo(request.attributes),
      payload: { userId, ...request.body }
    }

    const user = await this.updateUser.execute(input)
    return new UpdatedHttpResponse(user)
  }
}

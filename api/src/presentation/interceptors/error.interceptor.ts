import { mapDomainErrorToHttpError } from '@/api/application/mappers/domain-to-http-error.mapper'
import { IHttpRequest } from '@/api/application/ports/http-request'
import { IHttpResponse } from '@/api/application/ports/http-response'
import { Interceptor } from '@/api/application/ports/interceptor'
import { Logger } from '@/api/application/utlis/Logger'

import { HttpResponse } from '../responses/http-response'

export class ErrorInterceptor implements Interceptor<IHttpRequest, IHttpResponse> {
  onRequest(request: IHttpRequest): IHttpRequest {
    return request
  }

  onResponse<T>(response: IHttpResponse<T>): IHttpResponse<T> {
    return response
  }

  onError(error: Error): IHttpResponse {
    // log error to console
    Logger.getInstance().error(error.message, error)

    const { statusCode, message } = mapDomainErrorToHttpError(error)

    return new HttpResponse(statusCode, { statusCode, message })
  }
}

import { mapDomainErrorToHttpError } from '@/application/mappers/domain-to-http-error.mapper'
import { IHttpRequest } from '@/application/ports/http-request'
import { IHttpResponse } from '@/application/ports/http-response'
import { Interceptor } from '@/application/ports/interceptor'
import { Logger } from '@/application/utlis/Logger'
import { HttpResponse } from '@/presentation/responses/http-response'

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

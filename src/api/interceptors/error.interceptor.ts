import { Interceptor } from '@/api/interfaces/interceptor'
import { mapDomainErrorToHttpError } from '@/api/mappers/domain-to-http-error.mapper'
import { IHttpRequest } from '@/api/protocols/http-request'
import { HttpResponse, IHttpResponse } from '@/api/protocols/http-response'
import { Logger } from '@/infrastructure/utils/Logger'

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

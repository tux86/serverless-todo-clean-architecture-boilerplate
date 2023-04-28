import { Logger } from '@/infrastructure/utils/Logger'
import { Interceptor } from '@/presentation/interfaces/interceptor'
import { mapDomainErrorToHttpError } from '@/presentation/mappers/domain-to-http-error.mapper'
import { IHttpRequest } from '@/presentation/protocols/http-request'
import { HttpResponse, IHttpResponse } from '@/presentation/protocols/http-response'

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

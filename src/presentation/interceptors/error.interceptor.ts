import { Logger } from '@/infrastructure/helpers/Logger'
import { Interceptor } from '@/presentation/interceptors/interceptor'
import { mapDomainErrorToHttpError } from '@/presentation/mappers/domain-to-http-error.mapper'
import { IHttpRequest } from '@/presentation/protocols/http-request'
import { HttpResponse, IHttpResponse } from '@/presentation/protocols/http-response'

const logger = Logger.getInstance()

export class ErrorInterceptor implements Interceptor {
  onRequest(request: IHttpRequest): IHttpRequest {
    return request
  }

  onResponse<T>(response: IHttpResponse<T>): IHttpResponse<T> {
    return response
  }

  onError(error: Error): IHttpResponse {
    // log error to console
    logger.error(error.message, error)

    const { statusCode, message } = mapDomainErrorToHttpError(error)

    return new HttpResponse(statusCode, { statusCode, message })
  }
}

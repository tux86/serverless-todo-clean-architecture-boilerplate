import { Logger } from '@/infrastructure/helpers/Logger'
import { Interceptor } from '@/presentation/interceptors/interceptor'
import { IHttpRequest } from '@/presentation/protocols/http-request'
import { IHttpResponse } from '@/presentation/protocols/http-response'

const logger = Logger.getInstance()

export class LoggingInterceptor implements Interceptor {
  onRequest(request: IHttpRequest): IHttpRequest {
    logger.info('request ===> ', request)
    return request
  }

  onResponse<T>(response: IHttpResponse<T>): IHttpResponse<T> {
    logger.info('response ===> ', response)
    return response
  }
}

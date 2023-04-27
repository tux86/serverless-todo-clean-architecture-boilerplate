import { Logger } from '@/infrastructure/utils/Logger'
import { Interceptor } from '@/presentation/interfaces/interceptor'
import { IHttpRequest } from '@/presentation/protocols/http-request'
import { IHttpResponse } from '@/presentation/protocols/http-response'

const logger = Logger.getInstance()

export class LoggingInterceptor implements Interceptor<IHttpRequest, IHttpResponse> {
  onRequest(request: IHttpRequest): IHttpRequest {
    logger.info('request ===> ', request)
    return request
  }

  onResponse<T>(response: IHttpResponse<T>): IHttpResponse<T> {
    logger.info('response ===> ', response)
    return response
  }
}

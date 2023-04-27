import { LoggerFactory } from '@/infrastructure/helpers/logger'
import { Interceptor } from '@/presentation/interceptors/interceptor'
import { IHttpRequest } from '@/presentation/protocols/http-request'
import { IHttpResponse } from '@/presentation/protocols/http-response'

export class LoggingInterceptor implements Interceptor {
  onRequest(request: IHttpRequest): IHttpRequest {
    LoggerFactory.getInstance().info('request ===> ', request)
    return request
  }

  onResponse<T>(response: IHttpResponse<T>): IHttpResponse<T> {
    LoggerFactory.getInstance().info('response ===> ', response)
    return response
  }
}

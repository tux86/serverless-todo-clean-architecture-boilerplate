import { IHttpRequest } from '@/application/ports/http-request'
import { IHttpResponse } from '@/application/ports/http-response'
import { Interceptor } from '@/application/ports/interceptor'
import { Logger } from '@/infrastructure/utils/Logger'

export class LoggingInterceptor implements Interceptor<IHttpRequest, IHttpResponse> {
  onRequest(request: IHttpRequest): IHttpRequest {
    Logger.getInstance().info('request ===> ', request)
    return request
  }

  onResponse<T>(response: IHttpResponse<T>): IHttpResponse<T> {
    Logger.getInstance().info('response ===> ', response)
    return response
  }
}

import { Interceptor } from '@/api/interfaces/interceptor'
import { IHttpRequest } from '@/api/protocols/http-request'
import { IHttpResponse } from '@/api/protocols/http-response'
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

import { IHttpRequest } from '@/api/application/ports/http-request'
import { IHttpResponse } from '@/api/application/ports/http-response'
import { Interceptor } from '@/api/application/ports/interceptor'
import { Logger } from '@/api/application/utlis/Logger'

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

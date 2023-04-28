import { Logger } from '@/infrastructure/utils/Logger'
import { Interceptor } from '@/presentation/interfaces/interceptor'
import { IHttpRequest } from '@/presentation/protocols/http-request'
import { IHttpResponse } from '@/presentation/protocols/http-response'

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

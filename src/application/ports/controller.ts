import { IHttpRequest } from '@/application/ports/http-request'
import { IHttpResponse } from '@/application/ports/http-response'

export interface Controller<T = unknown> {
  handleRequest(request: IHttpRequest): Promise<IHttpResponse<T>>
}

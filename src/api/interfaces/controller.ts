import { IHttpRequest } from '@/api/protocols/http-request'
import { IHttpResponse } from '@/api/protocols/http-response'

export interface Controller<T = unknown> {
  handleRequest(request: IHttpRequest): Promise<IHttpResponse<T>>
}

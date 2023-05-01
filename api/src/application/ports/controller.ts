import { IHttpRequest } from './http-request'
import { IHttpResponse } from './http-response'

export interface Controller<T = unknown> {
  handleRequest(request: IHttpRequest): Promise<IHttpResponse<T>>
}

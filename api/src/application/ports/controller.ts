import { IHttpRequest } from './http-request'
import { IHttpResponse } from './http-response'

export interface Controller<T> {
  handleRequest(request: IHttpRequest<unknown, unknown, unknown, unknown, unknown>): Promise<IHttpResponse<T>>
}

import { IHttpRequest } from '@/presentation/protocols/http-request'
import { IHttpResponse } from '@/presentation/protocols/http-response'

export interface Controller<T = unknown> {
  handleRequest(request: IHttpRequest): Promise<IHttpResponse<T>>
}

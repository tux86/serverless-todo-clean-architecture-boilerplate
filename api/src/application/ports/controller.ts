import { IHttpRequest } from './http-request'
import { IHttpResponse } from './http-response'

export interface Controller<TRequestBody, TPathParams, TResponseBody> {
  handleRequest(request: IHttpRequest<TRequestBody, TPathParams>): Promise<IHttpResponse<TResponseBody>>
}

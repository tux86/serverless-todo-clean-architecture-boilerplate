import { Request } from '@/application/interfaces/request'
import { Response } from '@/application/interfaces/response'

export interface Controller<T = unknown> {
  handleRequest(requestModel: Request): Promise<Response<T>>
}

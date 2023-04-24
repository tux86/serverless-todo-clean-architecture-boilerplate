import { Request } from '@/application/interfaces/Request'
import { Response } from '@/application/interfaces/Response'

export interface Controller<T = unknown> {
  handleRequest(requestModel: Request): Promise<Response<T>>
}

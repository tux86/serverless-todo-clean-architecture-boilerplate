import { Dictionary, StringMap } from '@/common/types'

import { Claims } from '@/api/application/ports/claims'

export type HttpRequestAttributes = {} & Claims & Dictionary<string | any>

export interface IHttpRequest<
  Body = unknown,
  Params = StringMap,
  Query = StringMap,
  Headers = StringMap,
  Attributes = HttpRequestAttributes
> {
  body?: Body
  params?: Params
  query?: Query
  headers?: Headers
  // Custom parameters
  attributes?: Attributes
}

import { Dictionary, StringMap } from '@/common/types'

import { Claims } from '@/api/application/ports/claims'

export type HttpRequestAttributes = {} & Claims & Dictionary<string | any>

export interface IHttpRequest<
  Body = any,
  Params = StringMap,
  Query = Body,
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

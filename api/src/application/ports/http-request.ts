import { Dictionary } from '@/common/types'

export interface IHttpRequest<
  Body = any,
  Params = Dictionary<string | any>,
  Query = Body,
  Headers = Dictionary<string | any>,
  Attributes = HttpRequestAttributes
> {
  body?: Body
  params?: Params
  query?: Query
  headers?: Headers

  // Custom parameters
  attributes?: Attributes
}

export type HttpRequestAttributes = {
  clientId: string
  email: string
  tokenExp: Date
  tokenIat: Date
} & Dictionary<string | any>

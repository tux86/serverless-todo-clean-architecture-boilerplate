import { HttpStatus } from '@/presentation/protocols/http-status'

export interface IHttpResponse<T = unknown> {
  body: T
  statusCode: number
  headers?: { [key: string]: string }
}

export class HttpResponse<T = unknown> implements IHttpResponse<T> {
  constructor(public statusCode: number, public body: T, public headers?: { [key: string]: string }) {}
}

export class SuccessHttpResponse<T = unknown> extends HttpResponse<T> {
  constructor(body: T, headers?: { [key: string]: string }) {
    super(HttpStatus.OK, body, headers)
  }
}

export class CreatedHttpResponse<T = unknown> extends HttpResponse<T> {
  constructor(body: T, headers?: { [key: string]: string }) {
    super(HttpStatus.CREATED, body, headers)
  }
}

export class UpdatedHttpResponse<T = unknown> extends HttpResponse<T> {
  constructor(body: T = null, headers?: { [key: string]: string }) {
    super(HttpStatus.OK, body, headers)
  }
}

export class DeletedHttpResponse<T = unknown> extends HttpResponse<T> {
  constructor(body: T = null, headers?: { [key: string]: string }) {
    super(HttpStatus.NO_CONTENT, body, headers)
  }
}

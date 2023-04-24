import { Response as IResponse } from '@/application/interfaces/Response'
import { HttpStatus } from '@/presentation/utils/HttpStatus'

class Response<T = any> implements IResponse<T> {
  constructor(public statusCode: number, public body: T, public headers?: { [key: string]: string }) {}
}

export class SuccessResponse<T = any> extends Response<T> {
  constructor(body: T, headers?: { [key: string]: string }) {
    super(HttpStatus.OK, body, headers)
  }
}

export class CreatedResponse<T = any> extends Response<T> {
  constructor(body: T, headers?: { [key: string]: string }) {
    super(HttpStatus.CREATED, body, headers)
  }
}

export class UpdatedResponse<T = any> extends Response<T> {
  constructor(body: T = null, headers?: { [key: string]: string }) {
    super(HttpStatus.OK, body, headers)
  }
}

export class DeletedResponse<T = any> extends Response<T> {
  constructor(body: T = null, headers?: { [key: string]: string }) {
    super(HttpStatus.NO_CONTENT, body, headers)
  }
}

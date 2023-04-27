import { Controller } from '@/presentation/interfaces/controller'
import { IHttpRequest } from '@/presentation/protocols/http-request'
import { IHttpResponse } from '@/presentation/protocols/http-response'

export interface Interceptor {
  onRequest(request: IHttpRequest): IHttpRequest

  onResponse<T>(response: IHttpResponse<T>): IHttpResponse<T>

  onError?(error: Error): IHttpResponse<unknown>
}

// Interceptor decorator
export function WithInterceptor<T>(interceptor: Interceptor) {
  return function (_target: Controller, _propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value

    descriptor.value = async function (...args: any[]) {
      try {
        const request: IHttpRequest = args[0]
        const interceptedRequest = interceptor.onRequest(request)
        const response: IHttpResponse<T> = await originalMethod.apply(this, [interceptedRequest])
        return interceptor.onResponse(response)
      } catch (error) {
        if (interceptor.onError) {
          return interceptor.onError(error)
        } else {
          throw error
        }
      }
    }
  }
}

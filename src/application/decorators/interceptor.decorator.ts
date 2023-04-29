// Interceptor decorator
import { Controller } from '@/application/ports/controller'
import { IHttpRequest } from '@/application/ports/http-request'
import { IHttpResponse } from '@/application/ports/http-response'
import { Interceptor } from '@/application/ports/interceptor'

export function WithInterceptor<T>(interceptor: Interceptor<IHttpRequest, IHttpResponse>) {
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

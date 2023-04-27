// Interceptor decorator
import { Controller } from '@/presentation/interfaces/controller'
import { Interceptor } from '@/presentation/interfaces/interceptor'
import { IHttpRequest } from '@/presentation/protocols/http-request'
import { IHttpResponse } from '@/presentation/protocols/http-response'

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

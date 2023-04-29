export interface Interceptor<TRequest, TResponse> {
  onRequest(request: TRequest): TRequest

  onResponse(response: TResponse): TResponse

  onError?(error: Error): TResponse
}

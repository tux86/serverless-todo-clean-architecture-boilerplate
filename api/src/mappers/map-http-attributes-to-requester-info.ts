import { RequesterInfo } from '@/api/application/dtos/requester-info.dto'
import { UserNotAuthorizedError } from '@/api/application/errors'
import { HttpRequestAttributes } from '@/api/application/ports/http-request'

export const mapHttpAttributesToRequesterInfo = (attributes: HttpRequestAttributes): RequesterInfo => {
  if (!attributes?.userId || !attributes?.role) {
    throw new UserNotAuthorizedError('Either token is missing or user details are incomplete in token')
  }

  return {
    userId: attributes.userId,
    role: attributes.role
  }
}

import { RequesterInfo } from '@/api/application/dtos/requester-info.dto'
import { HttpRequestAttributes } from '@/api/application/ports/http-request'

export const mapHttpAttributesToRequesterInfo = (attributes: HttpRequestAttributes): RequesterInfo => {
  return {
    userId: attributes.userId,
    role: attributes.role
  }
}

import { AWS } from '@serverless/typescript'

export type LambdaFunction = Exclude<AWS['functions'], undefined>[string]
export type LambdaHTTPAPIPath = `/${string}` | `/{${string}}`

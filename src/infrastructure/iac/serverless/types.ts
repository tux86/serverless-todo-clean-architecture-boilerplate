import { AWS } from '@serverless/typescript'

import { Dictionary } from '@/common/types'

// aws types
export type AWSFunction = Exclude<AWS['functions'], undefined>[string]
export type AWSFunctions = AWS['functions']
export type AWSResources = AWS['resources']['Resources']
export type AWSResource = Exclude<AWSResources, undefined>[string]
export type AWSHttpApiPath = `/${string}` | `/{${string}}`
export type AWSOutputs = AWS['outputs']
export type AWSIam = AWS['provider']['iam']
export type AWSResourceSet = {
  resources: AWSResources
  outputs?: AWSOutputs
  vars?: Dictionary
}

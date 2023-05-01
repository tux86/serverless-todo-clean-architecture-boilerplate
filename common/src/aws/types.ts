import { AWS } from '@serverless/typescript'

// aws types
export type AWSRegion = AWS['provider']['region']
export type AWSFunction = Exclude<AWS['functions'], undefined>[string]
export type AWSFunctionEvent = Exclude<AWSFunction['events'], undefined>[number]
export type AWSFunctions = AWS['functions']
export type AWSResources = AWS['resources']['Resources']
export type AWSOutputs = AWS['resources']['Outputs']
export type AWSResource = Exclude<AWSResources, undefined>[string]
export type AWSHttpApiPath = `/${string}` | `/{${string}}`
export type AWSIam = AWS['provider']['iam']

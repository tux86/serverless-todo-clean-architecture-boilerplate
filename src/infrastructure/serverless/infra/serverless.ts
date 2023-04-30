import type { AWS } from '@serverless/typescript'

import { stackTags, tags } from '@/infrastructure/serverless/api/provider/tags'
import { resources } from '@/infrastructure/serverless/infra/ressources'
import { AWSRegion } from '@/infrastructure/serverless/utils/types'

export const serverlessConfiguration: AWS = {
  service: 'todo-infra',
  frameworkVersion: '3',
  useDotenv: true,
  configValidationMode: 'error',
  // Define the cloud service provider for the application
  provider: {
    name: 'aws',
    stage: '${opt:stage, "dev"}',
    region: '${param:region}' as AWSRegion,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true
    },
    stackTags: stackTags(),
    tags: tags()
  },
  // Custom settings and configurations specific to the application or plugins
  custom: {},
  // Resources to be created within the stack, like DynamoDB tables, S3 buckets, etc.
  resources: resources()
}

module.exports = serverlessConfiguration

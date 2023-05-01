import type { AWS } from '@serverless/typescript'

import { resources } from './ressources'
import { stackTags, tags } from '../api/src/infrastructure/serverless/provider/tags'
import { AWSRegion } from '../common/serverless/types'

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

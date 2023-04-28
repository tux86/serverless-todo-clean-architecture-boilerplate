import type { AWS } from '@serverless/typescript'

import { functions } from '@/infrastructure/iac/serverless/functions'
import { defaultIam } from '@/infrastructure/iac/serverless/iam/default-iam'
import { custom } from '@/infrastructure/iac/serverless/provider/custom'
import { stackTags, tags } from '@/infrastructure/iac/serverless/provider/tags'
import { resources } from '@/infrastructure/iac/serverless/ressources'

export const serverlessConfiguration: AWS = {
  service: 'todo-api',
  frameworkVersion: '3',
  useDotenv: true,
  configValidationMode: 'error',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  package: { individually: true },
  // Define the cloud service provider for the application
  provider: {
    name: 'aws',
    stage: '${opt:stage, "dev"}',
    region: '${env:AWS_REGION}' as AWS['provider']['region'],
    runtime: 'nodejs18.x',
    architecture: 'arm64',
    memorySize: 128,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000'
    },
    iam: defaultIam(),
    stackTags: stackTags(),
    tags: tags()
  },
  // Custom settings and configurations specific to the application or plugins
  custom: custom(),
  // Define the serverless functions
  functions: functions(),
  // Resources to be created within the stack, like DynamoDB tables, S3 buckets, etc.
  resources: resources()
}

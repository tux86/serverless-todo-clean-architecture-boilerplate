import type { AWS } from '@serverless/typescript'

import { functions } from '@/infrastructure/aws/iac/functions'
import { defaultIam } from '@/infrastructure/aws/iac/iam/default-iam'
import { custom } from '@/infrastructure/aws/iac/provider/custom'
import { stackTags, tags } from '@/infrastructure/aws/iac/provider/tags'
import { resources } from '@/infrastructure/aws/iac/ressources'

export const serverlessConfiguration: AWS = {
  service: 'todo-api',
  frameworkVersion: '3',
  useDotenv: true,
  configValidationMode: 'error',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  package: { individually: true },
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
  custom: custom(),
  functions: functions(),
  resources: resources()
}
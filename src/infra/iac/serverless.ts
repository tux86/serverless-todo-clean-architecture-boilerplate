import type { AWS } from '@serverless/typescript'

import { functions } from '@/infra/iac/functions'
import { defaultIam } from '@/infra/iac/iam/defaultIam'
import { custom } from '@/infra/iac/provider/custom'
import { stackTags, tags } from '@/infra/iac/provider/tags'
import { resources } from '@/infra/iac/ressources'

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

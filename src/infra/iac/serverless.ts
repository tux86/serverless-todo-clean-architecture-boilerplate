import type { AWS } from '@serverless/typescript'

import { createFunctions } from '@/infra/iac/functions'
import { createDefaultIam } from '@/infra/iac/iam/defaultIam'
import { createResources, todosTable, userPool } from '@/infra/iac/ressources'

export const serverlessConfiguration: AWS = {
  service: 'todo-api',
  frameworkVersion: '3',
  useDotenv: true,
  plugins: ['serverless-esbuild', 'serverless-offline'],
  package: { individually: true },
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    stage: '${opt:stage, "dev"}',
    region: 'eu-west-1',
    architecture: 'arm64',
    memorySize: 128,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      // TODO: move to the target lambda environement
      COGNITO_USER_POOL_ID: userPool.userPoolId,
      COGNITO_APP_CLIENT_ID: userPool.userPoolClientId,
      TODOS_TABLE: todosTable.tableName
    },
    iam: createDefaultIam()
  },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
      watch: {
        pattern: ['src/**/*.ts']
      }
    }
  },
  functions: createFunctions(),
  resources: createResources()
}

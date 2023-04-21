import type { AWS } from '@serverless/typescript'

import { todoFunctions } from './functions/todoFunctions'
import { defaultIam } from './iam/default'
import { CognitoUserPool } from './ressources/cognito/CognitoUserPool'
import { CognitoUserPoolClient } from './ressources/cognito/CognitoUserPoolClient'
import { TodosTable } from './ressources/dynamodb/TodosTable'

export const serverlessConfiguration: AWS = {
  service: 'todo-api',
  frameworkVersion: '3',
  useDotenv: true,
  plugins: ['serverless-esbuild', 'serverless-offline'],
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
      COGNITO_USER_POOL_ID: { Ref: 'CognitoUserPool' },
      COGNITO_APP_CLIENT_ID: { Ref: 'CognitoUserPoolClient' }
    },
    iam: defaultIam
  },
  functions: { ...todoFunctions },
  package: { individually: true },
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
  resources: {
    Resources: {
      TodosTable,
      CognitoUserPool,
      CognitoUserPoolClient
    }
  }
}

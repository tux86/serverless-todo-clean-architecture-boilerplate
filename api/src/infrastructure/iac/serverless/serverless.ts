import { AWSRegion } from '@/common/aws/types'
import type { AWS } from '@serverless/typescript'

import { functions } from './functions'
import { defaultIam } from './iam/default-iam'
import { stackTags, tags } from './provider/tags'

export const serverlessConfiguration: AWS = {
  service: 'todo-api',
  frameworkVersion: '3',
  useDotenv: true,
  configValidationMode: 'error',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  package: {
    individually: true
  },
  // Define the cloud service provider for the application
  provider: {
    name: 'aws',
    stage: '${opt:stage, "dev"}',
    region: '${param:region}' as AWSRegion,
    runtime: 'nodejs18.x',
    architecture: 'arm64',
    memorySize: 128,
    timeout: 20,
    versionFunctions: false,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true
    },
    httpApi: {
      authorizers: {
        jwtAuthorizer: {
          type: 'jwt',
          identitySource: '$request.header.Authorization',
          issuerUrl: 'https://cognito-idp.${self:provider.region}.amazonaws.com/${param:userPoolId}',
          audience: ['${param:appClientId}']
        }
      }
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      STAGE: '${sls:stage}'
    },
    iam: defaultIam(),
    stackTags: stackTags(),
    tags: tags()
  },
  // Custom settings and configurations specific to the application or plugins
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
      packager: 'pnpm',
      watch: {
        pattern: ['src/**/*.ts']
      }
    },
    'serverless-offline': {
      noPrependStageInUrl: true,
      ignoreJWTSignature: true
    }
  },
  // Define the lambda functions
  functions: functions()
}

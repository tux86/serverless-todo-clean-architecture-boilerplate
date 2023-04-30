import type { AWS } from '@serverless/typescript'

import { functions } from '@/infrastructure/serverless/api/functions'
import { defaultIam } from '@/infrastructure/serverless/api/iam/default-iam'
import { stackTags, tags } from '@/infrastructure/serverless/api/provider/tags'
import { AWSRegion } from '@/infrastructure/serverless/utils/types'

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
        // customAuthorizer: {
        //   type: 'request',
        //   functionName: 'customAuthorizer'
        // }
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
      watch: {
        pattern: ['src/**/*.ts']
      }
    },
    'serverless-offline': {
      noPrependStageInUrl: true,
      ignoreJWTSignature: true
    }
  },
  // Define the serverless functions
  functions: functions()
}

module.exports = serverlessConfiguration

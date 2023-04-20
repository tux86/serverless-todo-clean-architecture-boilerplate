import type {AWS} from '@serverless/typescript';
import {todoFunctions} from "./functions/todoFunctions";
import {TodosTable} from "./ressources/dynamodb/TodosTable";

export const serverlessConfiguration: AWS = {
    service: 'todo-api',
    frameworkVersion: '3',
    useDotenv: true,
    plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dynamodb-local'],
    provider: {
        name: 'aws',
        runtime: 'nodejs18.x',
        stage: '${opt:stage, "dev"}',
        region: 'eu-west-1',
        architecture: 'arm64',
        memorySize: 128,
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
        },
        iam: {
            role: {
                statements: [{
                    Effect: "Allow",
                    Action: [
                        "dynamodb:DescribeTable",
                        "dynamodb:Query",
                        "dynamodb:Scan",
                        "dynamodb:GetItem",
                        "dynamodb:PutItem",
                        "dynamodb:UpdateItem",
                        "dynamodb:DeleteItem",
                    ],
                    Resource: [
                        "arn:aws:dynamodb:${aws:region}:${aws:accountId}:table/*"
                    ]
                }],
            },
        },
    },
    functions: {...todoFunctions},
    package: {individually: true},
    custom: {
        esbuild: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: ['aws-sdk'],
            target: 'node18',
            define: {'require.resolve': undefined},
            platform: 'node',
            concurrency: 10,
        },
        dynamodb: {
            start: {
                port: 5000,
                inMemory: true,
                migrate: true,
            },
            stages: "dev"
        }
    },
    resources: {
        Resources: {
           TodosTable
        }
    }
};

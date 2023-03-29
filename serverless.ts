import type { AWS } from '@serverless/typescript';

import { getSignedUrl } from '@functions/getSignedUrl';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BUCKET: string;
      REGION: string;
    }
  }
}

const serverlessConfiguration: AWS = {
  service: 'aws-serverless-typescript-api',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dotenv-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    memorySize: 128,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      // BUCKET and REGION will load automatically
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: ['s3:PutObject'],
            Resource: '*',
          },
        ],
      },
    },
  },
  functions: { getSignedUrl },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node16',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dotenv: {
      required: { env: ['BUCKET', 'REGION'] },
    },
  },
};

module.exports = serverlessConfiguration;

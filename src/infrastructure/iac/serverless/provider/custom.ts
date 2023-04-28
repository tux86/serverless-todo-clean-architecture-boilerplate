import { AWS } from '@serverless/typescript'

const esbuild = {
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

export const custom = (): AWS['custom'] => {
  return {
    esbuild
  }
}

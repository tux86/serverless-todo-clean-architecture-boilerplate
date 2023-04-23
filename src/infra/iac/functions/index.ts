import { AWS } from '@serverless/typescript'

import { todoFunctions } from './todoFunctions'
import { userFunctions } from './userFunctions'

export const functions = (): AWS['functions'] => {
  return {
    ...userFunctions,
    ...todoFunctions
  }
}
